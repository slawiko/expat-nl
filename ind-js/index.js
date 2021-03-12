var player = require("play-sound")((opts = {}));
var axios = require("axios");

const urls = [
  // 'https://portal.ind.nl/oap/api/desks/AM/slots/?productKey=VAA&persons=1',
  "https://oap.ind.nl/oap/api/desks/AM/slots/?productKey=DOC&persons=1"
];

function lookup(url) {
  axios.get(url).then(result => {
    const data = JSON.parse(result.data.substring(5)).data;
    if (data.some(slot => checkSlot(slot))) {
      console.log(url);
      play();
    } else {
      console.log("......");
      setTimeout(() => {
        lookup(url);
      }, 1000 * (30 + Math.random() * 250));
    }
  });
}

urls.forEach(u => lookup(u));

function play() {
  setInterval(() => {
    player.play("to-the-point.mp3", function(err) {
      if (err) throw err;
    });
  }, 2000);
}

function checkSlot(slot) {
  const when = new Date(slot.date);
  const feb =
    when.getMonth() === 1 && when.getDate() < 31 && when.getDate() > 1;
  const march =
    when.getMonth() === 2 && when.getDate() < 3 && when.getDate() >= 1;
  return feb || march;
}

const promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );