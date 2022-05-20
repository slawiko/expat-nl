const axios = require('axios');
const { play } = require('./utils');

const urls = [
  // 'https://portal.ind.nl/oap/api/desks/AM/slots/?productKey=VAA&persons=1',
  "https://www.stories.com/webservices_stories/service/product/stories-europe/availability/1061067.json"
];

function lookup(url) {
  axios.get(url).then(({ data }) => {
    const { availability } = data;
    const needed = availability.filter(a => a !== "1061067002002" && a !== "1061067002001" && a !== "1061067002005" && a !== "1061067002004" && a !== "1061067002006" && a !== "1061067002007"&& a !== "1061067002008");
    if (needed.length > 0) {
    console.log(`Available at https://www.stories.com/en_eur/clothing/trousers/wide-trousers/product.wide-printed-silk-trousers-blue.1061067002.html`);
      play();
    } else {
      console.log("......");
      setTimeout(() => {
        lookup(url);
      }, 1000 * (Math.random() * 250));
    }
  });
}

urls.forEach(u => lookup(u));
