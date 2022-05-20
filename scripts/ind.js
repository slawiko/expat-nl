const axios = require('axios');
const { play } = require('./utils');

const urls = [
  // 'https://portal.ind.nl/oap/api/desks/AM/slots/?productKey=VAA&persons=1',
  "https://oap.ind.nl/oap/api/desks/DH/slots/?productKey=DOC&persons=1"
];

function lookup(url) {
  axios.get(url).then(result => {
    const data = JSON.parse(result.data.substring(5)).data;
    const availableSlot = data.find(slot => checkSlot(slot));
    if (availableSlot) {
      console.log(`Available at ${availableSlot.date}! Go schedule: https://oap.ind.nl/oap/en/#/doc`);
      play();
    } else {
      console.log("......");
      setTimeout(() => {
        lookup(url);
      }, 1000 * (10 + Math.random() * 250));
    }
  });
}

urls.forEach(u => lookup(u));

function checkSlot(slot) {
  const when = new Date(slot.date);
  const april =
    when.getMonth() === 3 &&  when.getDate() < 12;
  return april;
}

const promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );