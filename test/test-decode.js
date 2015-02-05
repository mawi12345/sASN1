var asn1 = require('../asn1');
var util = require('util');
//var diff = require('deep-diff').diff;

// [source](http://lapo.it/asn1js)
var lapoitDemoData = function() {
  return {
    buf: new Buffer('MIAGCSqGSIb3DQEHAqCAMIACAQExCzAJBgUrDgMCGgUAMIAGCSqGSIb3DQEHAQAAoIAwggHvMIIBWKADAgECAhAvoXazbunwSfREtACZZhlFMA0GCSqGSIb3DQEBBQUAMAwxCjAIBgNVBAMMAWEwHhcNMDgxMDE1MTUwMzQxWhcNMDkxMDE1MTUwMzQxWjAMMQowCAYDVQQDDAFhMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJUwlwhu5hR8X01f+vG0mKPRHsVRjpZNxSEmsmFPdDiD9kylE3ertTDf0gRkpIvWfNJ+eymuxoXF0Qgl5gXAVuSrjupGD6J+VapixJiwLXJHokmDihLs3zfGARz08O3qnO5ofBy0pRxq5isu/bAAcjoByZ1sI/g0iAuotC1UFObwIDAQABo1IwUDAOBgNVHQ8BAf8EBAMCBPAwHQYDVR0OBBYEFEIGXQB4h+04Z3y/n7Nv94+CqPitMB8GA1UdIwQYMBaAFEIGXQB4h+04Z3y/n7Nv94+CqPitMA0GCSqGSIb3DQEBBQUAA4GBAE0G7tAiaacJxvP3fhEj+yP9VDxL0omrRRAEaMXwWaBf/Ggk1T/u+8/CDAdjuGNCiF6ctooKc8u8KpnZJsGqnpGQ4n6L2KjTtRUDh+hija0eJRBFdirPQe2HAebQGFnmOk6Mn7KiQfBIsOzXim/bFqaBSbf06bLTQNwFouSO+jwOAAAxggElMIIBIQIBATAgMAwxCjAIBgNVBAMMAWECEC+hdrNu6fBJ9ES0AJlmGUUwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTA4MTAxNTE1MDM0M1owIwYJKoZIhvcNAQkEMRYEFAAAAAAAAAAAAAAAAAAAAAAAAAAAMA0GCSqGSIb3DQEBAQUABIGAdB7ShyMGf5lVdZtvwKlnYLHMUqJWuBnFk7aQwHAmg3JnH6OcgId2F+xfg6twXm8hhUBkhHPlHGoWa5kQtN9n8rz3NorzvcM/1Xv9+0Eal7NYSn2Hb0C0DMj2XNIYH2C6CLIHkmy1egzUvzsomZPTkx5nGDWm+8WHCjWb9A6lyrMAAAAAAAA=', 'base64'),
    expect: [
      "1.2.840.113549.1.7.2",
      [
        1,
        ["1.3.14.3.2.26",null],
        ["1.2.840.113549.1.7.1"],
        [
          [
            2,
            new Buffer([47,161,118,179,110,233,240,73,244,68,180,0,153,102,25,69]),
            ["1.2.840.113549.1.1.5",null],
            {"2.5.4.3":"a"},
            [new Date("2008-10-15T15:03:41.000Z"),new Date("2009-10-15T15:03:41.000Z")],
            {"2.5.4.3":"a"},
            [
              ["1.2.840.113549.1.1.1",null],
              [
                new Buffer([0,137,83,9,112,134,238,97,71,197,244,213,255,175,27,73,138,61,17,236,85,24,233,100,220,82,18,107,38,20,247,67,136,63,100,202,81,55,122,187,83,13,253,32,70,74,72,189,103,205,39,231,178,154,236,104,92,93,16,130,94,96,92,5,110,74,184,238,164,96,250,39,229,90,166,44,73,139,2,215,36,122,36,152,56,161,46,205,243,124,96,17,207,79,14,222,169,206,230,135,193,203,74,81,198,174,98,178,239,219,0,7,35,160,28,153,214,194,63,131,72,128,186,139,66,213,65,78,111]),
                new Buffer([1,0,1])
              ]
            ],
            [
              ["2.5.29.15",new Buffer([255]),new Buffer([4,240])],
              ["2.5.29.14",new Buffer([93,0,120,135,237,56])],
              ["2.5.29.35",new Buffer([48,22,128,20,66,6,93,0,120,135,237,56,103,124,191,159,179,111,247,143,130,168,248,173])]
            ]
          ],
          ["1.2.840.113549.1.1.5",null],
          new Buffer([238,208,34,105,167,9])
        ],
        [
          1,
          [
            {"2.5.4.3":"a"},
            new Buffer([47,161,118,179,110,233,240,73,244,68,180,0,153,102,25,69])
          ],
          ["1.3.14.3.2.26",null],
          ["1.2.840.113549.1.9.3","1.2.840.113549.1.7.1"],
          ["1.2.840.113549.1.9.5",new Date("2008-10-15T15:03:43.000Z")],
          ["1.2.840.113549.1.9.4",new Buffer([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])],
          ["1.2.840.113549.1.1.1",null],
          new Buffer([210,135,35,6,127,153,85,117,155,111,192,169,103,96,177,204,82,162,86,184,25,197,147,182,144,192,112,38,131,114])
        ]
      ]
    ]
  };
};

var certDemoData = function() {
  return {
    buf: new Buffer('308202013082016a020900b29952e79147248f300d06092a864886f70d01010b05003045310b30090603550406130241553113301106035504080c0a536f6d652d53746174653121301f060355040a0c18496e7465726e6574205769646769747320507479204c7464301e170d3135303230333131323034385a170d3136303230333131323034385a3045310b30090603550406130241553113301106035504080c0a536f6d652d53746174653121301f060355040a0c18496e7465726e6574205769646769747320507479204c746430819f300d06092a864886f70d010101050003818d0030818902818100a3c487837853ed2aaba792e65352c1d74b7b04dd29b10d9ad3b947d959372068d331190bb3ff13bf7f1a433b3024a32cd937c0039b20a8ebf95b0533b1d1a4577123ef34b82380e47234a2edb43b679b193292314dde08f329d33ade9484ec702f82989c58d2328eda8b2eb5d3f039ecc1517cb18ca599602a7fd74e94c9f6c10203010001300d06092a864886f70d01010b05000381810072b507ef56fc00063e24c16cd966f8cc1424d630541800328419efb98b87208f72c718b89d8afc3d880d27d2116fa5b93b6663b82890be71a2a6e84e9cb16670b0d6b2db3e574e9576655ce959ffdd62761b73ff0b99c7a4221d6ac965104ae2ef638a4929c1426d563eb52bfbabfb88da95978064720bea86cbdbbaa5a68c98', 'hex'),
    expect: [
      [
        new Buffer([0,178,153,82,231,145,71,36,143]),
        ["1.2.840.113549.1.1.11",null],
        {
          "2.5.4.6": "AU",
          "2.5.4.8": "Some-State",
          "2.5.4.10": "Internet Widgits Pty Ltd"
          
        },
        [new Date("2015-02-03T11:20:48.000Z"), new Date("2016-02-03T11:20:48.000Z")],
        {
          "2.5.4.6": "AU",
          "2.5.4.8": "Some-State",
          "2.5.4.10": "Internet Widgits Pty Ltd"
        },
        [
          ["1.2.840.113549.1.1.1",null],
          [
            new Buffer([0,163,196,135,131,120,83,237,42,171,167,146,230,83,82,193,215,75,123,4,221,41,177,13,154,211,185,71,217,89,55,32,104,211,49,25,11,179,255,19,191,127,26,67,59,48,36,163,44,217,55,192,3,155,32,168,235,249,91,5,51,177,209,164,87,113,35,239,52,184,35,128,228,114,52,162,237,180,59,103,155,25,50,146,49,77,222,8,243,41,211,58,222,148,132,236,112,47,130,152,156,88,210,50,142,218,139,46,181,211,240,57,236,193,81,124,177,140,165,153,96,42,127,215,78,148,201,246,193]),
            new Buffer([1,0,1])
          ]
        ]
      ],
      ["1.2.840.113549.1.1.11",null],
      new Buffer([0,114,181,7,239,86,252,0,6,62,36,193,108,217,102,248,204,20,36,214,48,84,24,0,50,132,25,239,185,139,135,32,143,114,199,24,184,157,138,252,61,136,13,39,210,17,111,165,185,59,102,99,184,40,144,190,113,162,166,232,78,156,177,102,112,176,214,178,219,62,87,78,149,118,101,92,233,89,255,221,98,118,27,115,255,11,153,199,164,34,29,106,201,101,16,74,226,239,99,138,73,41,193,66,109,86,62,181,43,251,171,251,136,218,149,151,128,100,114,11,234,134,203,219,186,165,166,140,152])
    ],
    expectNamed: [
      [
        new Buffer([0,178,153,82,231,145,71,36,143]),
        ["sha256WithRSAEncryption",null],
        {
          "countryName": "AU",
          "stateOrProvinceName": "Some-State",
          "organizationName": "Internet Widgits Pty Ltd"
          
        },
        [new Date("2015-02-03T11:20:48.000Z"), new Date("2016-02-03T11:20:48.000Z")],
        {
          "countryName": "AU",
          "stateOrProvinceName": "Some-State",
          "organizationName": "Internet Widgits Pty Ltd"
        },
        [
          ["RSAEncryption", null],
          [
            new Buffer([0,163,196,135,131,120,83,237,42,171,167,146,230,83,82,193,215,75,123,4,221,41,177,13,154,211,185,71,217,89,55,32,104,211,49,25,11,179,255,19,191,127,26,67,59,48,36,163,44,217,55,192,3,155,32,168,235,249,91,5,51,177,209,164,87,113,35,239,52,184,35,128,228,114,52,162,237,180,59,103,155,25,50,146,49,77,222,8,243,41,211,58,222,148,132,236,112,47,130,152,156,88,210,50,142,218,139,46,181,211,240,57,236,193,81,124,177,140,165,153,96,42,127,215,78,148,201,246,193]),
            new Buffer([1,0,1])
          ]
        ]
      ],
      ["sha256WithRSAEncryption",null],
      new Buffer([0,114,181,7,239,86,252,0,6,62,36,193,108,217,102,248,204,20,36,214,48,84,24,0,50,132,25,239,185,139,135,32,143,114,199,24,184,157,138,252,61,136,13,39,210,17,111,165,185,59,102,99,184,40,144,190,113,162,166,232,78,156,177,102,112,176,214,178,219,62,87,78,149,118,101,92,233,89,255,221,98,118,27,115,255,11,153,199,164,34,29,106,201,101,16,74,226,239,99,138,73,41,193,66,109,86,62,181,43,251,171,251,136,218,149,151,128,100,114,11,234,134,203,219,186,165,166,140,152])
    ],
    oidNames: {
      '1.2.840.113549.1.1.11': 'sha256WithRSAEncryption',
      '2.5.4.6': 'countryName',
      '2.5.4.8': 'stateOrProvinceName',
      '2.5.4.10': 'organizationName',
      '1.2.840.113549.1.1.1': 'RSAEncryption',
    }
  };
};

exports.decodeCertDoNotAlterBuffer = function(test) {
  test.expect(1);
  var rec = certDemoData();
  var pre = JSON.stringify(rec.buf);
  asn1.decode(rec.buf);
  var post = JSON.stringify(rec.buf);
  test.deepEqual(pre, post, 'decode cert alters buffer');
  test.done();
};

exports.decodeLapoitDemoDoNotAlterBuffer = function(test) {
  test.expect(1);
  var rec = lapoitDemoData();
  var pre = JSON.stringify(rec.buf);
  asn1.decode(rec.buf);
  var post = JSON.stringify(rec.buf);
  test.deepEqual(pre, post, 'decode lapoit demo alters buffer');
  test.done();
};



exports.decodeLapoitDemo = function(test) {
  test.expect(1);
  var rec = lapoitDemoData();
  var tag = asn1.decode(rec.buf);
  //console.log(util.inspect(tag, { depth: null }));
  //console.log(JSON.stringify(tag)); 
  //console.log(diff(JSON.parse(JSON.stringify(tag)), JSON.parse(JSON.stringify(rec.expect))));
  test.deepEqual(tag, rec.expect, 'lapoit demo data simplified');
  test.done();
};


exports.decodeCert = function(test) {
  test.expect(1);
  var rec = certDemoData();
  var tag = asn1.decode(rec.buf);
  //console.log(util.inspect(tag, { depth: null }));
  //console.log(JSON.stringify(tag));
  test.deepEqual(tag, rec.expect, 'cert demo data simplified');
  test.done();
};


exports.decodeCertOIDMappingOnlyOIDs = function(test) {
  test.expect(1);
  var rec = certDemoData();
  var tag = asn1.decode(rec.buf, {
    onlyOidObjectKeys: true
  });
  //console.log(util.inspect(tag, { depth: null }));
  //console.log(JSON.stringify(tag));
  test.deepEqual(tag, rec.expect, 'cert demo data simplified with onlyOidObjectKeys');
  test.done();
};


exports.decodeCertOIDNames = function(test) {
  test.expect(1);
  var rec = certDemoData();
  var tag = asn1.decode(rec.buf, {
    oids: rec.oidNames
  });
  //console.log(util.inspect(tag, { depth: null }));
  //console.log(JSON.stringify(tag));
  test.deepEqual(tag, rec.expectNamed, 'cert demo data simplified with OID names');
  test.done();
};

exports.decodeLengthError = function(test) {
  var buf = new Buffer('egSBb6uE5mb7htBdQU6qxgOkLOXFkQPU/6vjZUV7l1NWN3fIR8ITeV0hRK6WR78HNnTH4Lfceknjqd+bFowKV0n10WYRmE/HKyA0tB+3ZCxmxpmjDjncZ3XbkH1UpIetgEDk3mG+tLgt8z0IPRftUMrfMb6wwAxTLZ/krC9JQcM=', 'base64');
  test.expect(1);
  test.throws(function(){
    var tag = asn1.decode(buf);
    console.log(tag);
  });
  test.done();
};