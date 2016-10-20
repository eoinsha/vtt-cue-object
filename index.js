var Vtt = require('vtt.js');
var Once = require('once');

module.exports = function(vttText, done) {
  var cb = Once(done); // Required as vtt.js can fire multiple errors

  // Mock objects required in absence of browser
  var mockWindowObject = {
    VTTCue: Vtt.VTTCue,
    VTTRegion: Vtt.VTTRegion
  };

  global.navigator = {
    userAgent: ''
  };

  var cues = [];

  var parser = new Vtt.WebVTT.Parser(mockWindowObject, Vtt.WebVTT.StringDecoder());
  parser.oncue = onCue;
  parser.onflush = onFlush;
  parser.onparsingerror = onParsingError;
  parser.parse(vttText);
  parser.flush();

  function onCue(cue) {
    cues.push({
      startTime: cue.startTime,
      endTime: cue.endTime,
      text: cue.text
    });
  }

  function onFlush() {
    cb(null, { cues: cues });
  }

  function onParsingError(error) {
    cb(error);
  }
}
