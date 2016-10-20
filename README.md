vtt-cue-object
===

Simple wrapper around (vtt.js)[https://github.com/mozilla/vtt.js] that runs without any browser and produces an object representation of WebVTT cues.

# Usage

```
var VttToObject = require('vtt-cue-object');
var vttText = '...'; // (WebVTT subtitles as a string)
VttToObject(vttText, function (err, obj) {
  if (!err) {
    // obj has startTime and endTime (decimal seconds) and text (string)
  }
});
