var request = require("request"),
    cheerio = require("cheerio");

module.exports = {

  getOffer: function() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        request("http://www.marksandspencer.com", function(error, response, body) {
          if (!error) {
            var parser = cheerio.load(body),
                offerText = parser("body > div:nth-child(11) > div.site-strip > ul > li:nth-child(1) > a").text();
            resolve(offerText);
          } else {
            reject(error);
          }
        });
      }, 1000);
    });
  },

  submitOffer: function(offer) {
    return Promise.resolve(offer)
      .then(function(offer) {
        // We need to return a promise here as the logic executes asynchronously
        // Notice that declaring a new promise works using callbacks and so it
        // can be used to tie into existing libraries and tools.
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            request({
              method: "POST",
              json:   true,
              body:   {offer: offer},
              uri:    "http://httpbin.org/post"
            }, function(error, response, body) {
              error ? reject(error) : resolve(body);
            });
          }, 500);
        });
      });
  }

};
