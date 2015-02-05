# ASN.1 decoder

```sh
npm install sasn1
```

```javascript

var asn1 = require('sasn1');

var buffer = new Buffer('MIICATCCAWoCCQCymVLnkUckjzANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMB4XDTE1MDIwMzExMjA0OFoXDTE2MDIwMzExMjA0OFowRTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAo8SHg3hT7Sqrp5LmU1LB10t7BN0psQ2a07lH2Vk3IGjTMRkLs/8Tv38aQzswJKMs2TfAA5sgqOv5WwUzsdGkV3Ej7zS4I4DkcjSi7bQ7Z5sZMpIxTd4I8ynTOt6UhOxwL4KYnFjSMo7aiy610/A57MFRfLGMpZlgKn/XTpTJ9sECAwEAATANBgkqhkiG9w0BAQsFAAOBgQBytQfvVvwABj4kwWzZZvjMFCTWMFQYADKEGe+5i4cgj3LHGLidivw9iA0n0hFvpbk7ZmO4KJC+caKm6E6csWZwsNay2z5XTpV2ZVzpWf/dYnYbc/8LmcekIh1qyWUQSuLvY4pJKcFCbVY+tSv7q/uI2pWXgGRyC+qGy9u6paaMmA==', 'base64');

console.log(asn1.decode(buffer));
/*
[ [ <Buffer 00 b2 99 52 e7 91 47 24 8f>,
    [ '1.2.840.113549.1.1.11', null ],
    { '2.5.4.6': 'AU',
      '2.5.4.8': 'Some-State',
      '2.5.4.10': 'Internet Widgits Pty Ltd' },
    [ Tue Feb 03 2015 12:20:48 GMT+0100 (CET),
      Wed Feb 03 2016 12:20:48 GMT+0100 (CET) ],
    { '2.5.4.6': 'AU',
      '2.5.4.8': 'Some-State',
      '2.5.4.10': 'Internet Widgits Pty Ltd' },
    [ [Object], [Object] ] ],
  [ '1.2.840.113549.1.1.11', null ],
  <Buffer 00 72 b5 07 ef 56 fc 00 06 3e 24 c1 6c d9 66 f8 cc 14 24 d6 30 54 18 00 32 84 19 ef b9 8b 87 20 8f 72 c7 18 b8 9d 8a fc 3d 88 0d 27 d2 11 6f a5 b9 3b 66 ...> ]
*/

```

### API

```javascript

asn1.decode(buffer, options);

// defaults
options = {
	simplify: true, // simply the output
	checkLength: true, // throw error if not the whole buffer can be decoded
	deep: true, // try to decode binary ASN.1 types as ASN.1
	quiet: true // if false console.log if no decoder for the type is avaliable
}

```

#### simplify

```javascript

var tag = asn1.decode(buffer, {simplify: false});
console.log(tag);

/*
{ start: 0,
  class: 0,
  constructed: true,
  type: 16,
  name: 'Sequence',
  length: 513,
  Sequence: 
   [ { start: 4,
       class: 0,
       constructed: true,
       type: 16,
       name: 'Sequence',
       length: 362,
       Sequence: [Object] },
     { start: 370,
       class: 0,
       constructed: true,
       type: 16,
       name: 'Sequence',
       length: 13,
       Sequence: [Object] },
.....
*/

var stag = asn1.simplify(tag);
// stag is equal to asn1.decode(buffer, {simplify: true});

/*
[ [ <Buffer 00 b2 99 52 e7 91 47 24 8f>,
    [ '1.2.840.113549.1.1.11', null ],
    { '2.5.4.6': 'AU',
      '2.5.4.8': 'Some-State',
      '2.5.4.10': 'Internet Widgits Pty Ltd' },
    [ Tue Feb 03 2015 12:20:48 GMT+0100 (CET),
      Wed Feb 03 2016 12:20:48 GMT+0100 (CET) ],
    { '2.5.4.6': 'AU',
      '2.5.4.8': 'Some-State',
      '2.5.4.10': 'Internet Widgits Pty Ltd' },
    [ [Object], [Object] ] ],
  [ '1.2.840.113549.1.1.11', null ],
  <Buffer 00 72 b5 07 ef 56 fc 00 06 3e 24 c1 6c d9 66 f8 cc 14 24 d6 30 54 18 00 32 84 19 ef b9 8b 87 20 8f 72 c7 18 b8 9d 8a fc 3d 88 0d 27 d2 11 6f a5 b9 3b 66 ...> ]
*/

```


#### LICENSE

The MIT License (MIT)

Copyright (c) 2015 Martin Wind

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.