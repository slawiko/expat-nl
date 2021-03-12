const player = require("play-sound")((opts = {}));

function play() {
  setInterval(() => {
    player.play("to-the-point.mp3", function(err) {
      if (err) throw err;
    });
  }, 2000);
}

module.exports = {
  play
}