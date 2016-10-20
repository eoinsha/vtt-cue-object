var test = require('tap').test;
var VttToObject = require('..');

test('parse a few cues', function(t) {
  var vtt = `WEBVTT FILE

1
00:00:03.500 --> 00:00:05.000 D:vertical A:start
This is the beginning

2
00:00:06.000 --> 00:00:09.000 A:start
This is the end`;
  VttToObject(vtt, (err, obj) => {
    t.equal(err, null);
    t.isA(obj, 'object');
    t.ok(obj.cues);
    t.equal(obj.cues.length, 2);
    t.equal(obj.cues[0].startTime, 3.5);
    t.equal(obj.cues[0].endTime, 5);
    t.equal(obj.cues[0].text, 'This is the beginning');
    t.equal(obj.cues[1].startTime, 6);
    t.equal(obj.cues[1].endTime, 9);
    t.equal(obj.cues[1].text, 'This is the end');
    t.end();
  });
});

test('parse with error', function(t) {
  VttToObject('01 ->> 02\ntext', function(err, obj) {
    t.equal(obj, undefined);
    t.equal(err.name, 'ParsingError');
    t.ok(err);
    t.end();
  });
});
