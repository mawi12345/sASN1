var constants = require('./constants')
  , util = require('util')
  , moment = require('moment');

var extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || typeof add !== 'object') return origin;
  
  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

var moveCursor = function(buf, size) {
  if (buf.cursor === undefined) throw new Error('buf.cursor is required');
  var offset = buf.cursor;
  buf.cursor += size;
  return offset;
};

var getTypeName = function(value) {
  if (constants.types[value]) {
    return constants.types[value];
  } else {
    throw new Error('invalid type');
  }
};

var getLength = function (buffer) {
  var buf = buffer.readUInt8(moveCursor(buffer, 1));
  var len = buf & 0x7F;
  if (len == buf)
      return len;
  if (len > 6)
      throw new Error("Length over 48 bits not supported at position " + (buffer.cursor - 1));
  if (len === 0)
      return null; // indefinite-length
  buf = 0;
  for (var i = 0; i < len; ++i)
      buf = (buf * 256) + buffer.readUInt8(moveCursor(buffer, 1));
  return buf;
};

var decoders = {};
var indefiniteLengthDecoders = {};

// this is the fallback decoder!
decoders.BitString = function(buf, tag, options) {
  var target = new Buffer(tag.length);
  if (buf.cursor + tag.length > buf.length)
  	throw new Error('buffer to small');
  buf.copy(target, 0, buf.cursor, buf.cursor + tag.length);
  buf.cursor += tag.length;
  
  // create save options for possible ASN1 sub content
  var subOptions = {};
  extend(subOptions, options);
  subOptions.noLengthCheck = false;
  // try to decode the the buffer
  try {
    var child = decode(target, subOptions);
    child.isASN1 = true;
    return child;
  } catch(e) {
    // try to remove paddding and decode the buffer
    try {
      target.cursor = 0;
      for(var i = 0; i<target.length; i++) {
        if (target[target.cursor] != 0) {
          break;
        }
        target.cursor++;
      }
      var child2 = decode(target, subOptions);
      child2.isASN1 = true;
      return child2;
    } catch(e2) {
      // not possible to decode - return the buffer
      target.cursor = undefined;
      return target;
    }
    
  }
};

decoders.Integer = function(buf, tag, options) {
  var target = new Buffer(tag.length);
  buf.copy(target, 0, buf.cursor, buf.cursor + tag.length);
  buf.cursor += tag.length;
  if (target.length == 1) {
    return target.readInt8(0);
  } else if (target.length == 2) {
    return target.readInt16BE(0);
  } else if (target.length == 4) {
    return target.readInt32BE(0);
  } else {
    return target;
  }
};

decoders.Sequence = function(buf, tag, options) {
  var seq = [];
  var end = buf.cursor + tag.length;
  while(buf.cursor < end) {
     seq.push(decode(buf, options));
  }
  return seq;
};

indefiniteLengthDecoders.Sequence = function(buf, tag, options) {
  var seq = [];
  while(true) {
     seq.push(decode(buf, options));
     if (buf.readUInt16BE(buf.cursor) == 0) {
       buf.cursor += 2;
       //console.log('end ended');
       break;
     } else {
       //console.log('not ended', buf.slice(buf.cursor, buf.cursor+2).toString('hex'), buf.cursor);
     }
  }
  return seq;
};

decoders.EOC = function(buf, tag, options) {
  return decode(buf, options);
};

indefiniteLengthDecoders.EOC = function(buf, tag, options) {
  var child = decode(buf, options);
  if (buf.readUInt16BE(buf.cursor) == 0) {
    buf.cursor += 2;
  } else {
    throw new Error('Indefinite length EOC with multiple children');
  }
  return child;
};

decoders.Set = function(buf, tag, options) {
  return decode(buf, options);
};

decoders.Null = function(buf, tag, options) {
  if (tag.length > 0) throw new Error('invalid null');
  return null;
};

decoders.PrintableString = function(buf, tag, options) {
  buf.cursor += tag.length;
  return buf.slice(buf.cursor - tag.length, buf.cursor).toString('ascii');
};

decoders.Utf8String = function(buf, tag, options) {
  buf.cursor += tag.length;
  return buf.slice(buf.cursor - tag.length, buf.cursor).toString('utf-8');
};

decoders.UTCTime = function(buf, tag, options) {
  buf.cursor += tag.length;
  var dateString =  buf.slice(buf.cursor - tag.length, buf.cursor).toString('ascii');
  var formats = ['YYMMDDHHmmss', 'YYYYMMDDHHmmss'];
  var m = null;
  var i = 0;
  while((!m || !m.isValid()) && i <= formats.length) {
    m = moment.utc(dateString, formats[i]);
    i++;
  }
  
  if (m.isValid()) {
    return m.toDate();
  } else {
    return dateString;
  }
};

/*
   840 =  0000 0011 0100 1000
          1000 0110 0100 1000
113549 =  00000001 10111011 10001101
          10000110 11110111 00001101
*/
decoders.OID = function(buffer, tag, options) {
  var buf = buffer.slice(buffer.cursor, buffer.cursor + tag.length);
  buffer.cursor += tag.length;
  var oid = [];
  oid.push(Math.floor(buf[0] / 40));
  oid.push(buf[0] % 40);
  var multi = [];
  for (var i = 1; i < buf.length; i++) {
    multi.unshift(buf[i]);
    if (buf[i] < 128) {
      if (multi.length == 1) {
        oid.push(multi[0]);
      } else {
        var v = multi[0];
        for (var j = 1; j < multi.length; j++) {
          v += ((multi[j] - 128) << (8*j)-j);
        }
        oid.push(v);
      }
      multi = [];
    }
  }
  return oid.join('.');
};

var decode = function(buf, options) {
  var tag = {start: buf.cursor};
  var val = buf.readUInt8(moveCursor(buf, 1));
  tag.class = val >> 6;
  tag.constructed = ((val & 0x20) !== 0);
  tag.type = val & 0x1F;
  tag.name = getTypeName(tag.type);
  tag.length = getLength(buf);
  
  if (tag.length == null) {
    if (indefiniteLengthDecoders[tag.name]) {
      tag[tag.name] = indefiniteLengthDecoders[tag.name](buf, tag, options);
    } else {
      console.error('Indefinite length decoder '+tag.name+' is not implemented (at: '+buf.cursor+')');
    }
  } else {
    if (decoders[tag.name]) {
      tag[tag.name] = decoders[tag.name](buf, tag, options);
    } else {
      if (!options.quiet)
        console.log('decoder '+tag.name+' is not implemented');
      tag[tag.name] = decoders.BitString(buf, tag, options);
    }
  }
  return tag;
};

var simplify = function(tag, options) {
  if (tag.Sequence) {
    var containsOnlySetsWithValidKeys = true;
    // check if true create object
    var i = 0;
    var child, simpleKey, obj = {};
    while(i<tag.Sequence.length && containsOnlySetsWithValidKeys) {
      child = tag.Sequence[i];
      i++;
      if (!child.Set || !child.Set.Sequence || child.Set.Sequence.length != 2) {
        containsOnlySetsWithValidKeys = false;
      } else {
        if (options.onlyOidObjectKeys && !child.Set.Sequence[0].OID) {
          containsOnlySetsWithValidKeys = false;
        } else {
          simpleKey = simplify(child.Set.Sequence[0], options);
          if (typeof simpleKey != 'string') {
            containsOnlySetsWithValidKeys = false;
          } else {
            obj[simpleKey] = simplify(child.Set.Sequence[1], options);
          }
        }
      }
    }
    if (containsOnlySetsWithValidKeys) {
      return obj;
    } else {
      return tag.Sequence.map(function(tag){
        return simplify(tag, options);
      });
    } 
  } else if (tag.Set) {
    return simplify(tag.Set, options);
  } else if (tag.OID) {
    var oid = tag.OID;
    if (options.oids && options.oids[oid]) {
      return options.oids[oid];
    } else {
      return oid;
    }
  } else if (tag.EOC) {
    return simplify(tag.EOC, options);
  } else {
    if (tag[tag.name] !== undefined) {
      if (tag[tag.name] !== null && tag[tag.name].isASN1) {
        return simplify(tag[tag.name], options);
      } else {
        return tag[tag.name];
      }
    } else {
      console.log('can not simplify '+tag.name);
      return tag;
    }
  }
};

exports.decode = function(buf, opts) {
  var options = extend({}, {
    quiet: true,
    simplify: true,
    noLengthCheck: false
  });
  options = extend(options, opts);
  buf.cursor = 0;
  var tag = decode(buf, options);
  if (!options.noLengthCheck) {
    if (buf.length != buf.cursor) {
      throw new Error('stop decode at '+buf.cursor+', buffer length '+buf.length);
    }
  }
  
  if (options.simplify) {
    return simplify(tag, options);
  } else {
    return tag;
  }
};

exports.simplify = function(tag, options) {
  options = options || {};
  return simplify(tag, options);
};


