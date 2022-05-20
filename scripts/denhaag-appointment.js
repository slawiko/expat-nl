const axios = require('axios');
const { play } = require('./utils');

const url = 'https://www.denhaag.nl/has/timeblockr/v2/timeslots/7a4dda1c-e408-451f-af6a-49f8741dd11f;1/09c2012f-4922-4b9d-bb99-972cb420ac80,664d668e-8aea-4b00-ad84-fdade7d263d3/2021-3-12/2021-3-12?mode=firstavailable&firstavailabletop=3'
const API_KEY = 'f48fdea386d34d3ba1772d732c34f77e';
const bestDate = new Date('2021-04-23');

function lookup() {
  axios.get(url, {
    headers: { 'API-Key': API_KEY }
  }).then(result => {
    const { SlotOptions } = result.data;
    const firstSlot = SlotOptions[0];
    if (checkSlot(firstSlot)) {
      console.log(`Found! ${firstSlot.Date}. Make an appointment: https://www.denhaag.nl/nl/bestuur-en-organisatie/contact-met-de-gemeente/maak-een-afspraak-met-de-gemeente.htm#select/product/47`);
      play();
    } else {
      console.log(`Best slot is ${firstSlot.Date}`);
      setTimeout(() => {
        lookup(url);
      }, 1000 * (300 + Math.random() * 300));
    }
  }).catch(e => {
    console.error(e);
    setTimeout(() => {
      lookup(url);
    }, 1000 * (600 + Math.random() * 300));
  });
}

function checkSlot(slot) {
  const date = new Date(slot.Date);
  return date < bestDate;
}

lookup();
