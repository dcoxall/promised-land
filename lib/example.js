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
            // We no longer have a success callback but we do now have
            // the resolve function for our promise. This is equivalent.
            resolve(offerText);
          } else {
            // Similarly we don't have a fail callback but we do
            // have the promises reject function. This marks an issue.
            reject(error);
          }
        });
      }, 1000);
    });
  },

  submitOffer: function(offer) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        request({
          method: "POST",
          json:   true,
          body:   {offer: offer},
          uri:    "http://httpbin.org/post"
        }, function(error, response, body) {
          // If error then reject else resolve
          error ? reject(error) : resolve(body);
        });
      }, 500);
    });
  }

};
