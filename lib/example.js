var request = require("request"),
    cheerio = require("cheerio");

module.exports = {

  getOffer: function(success, fail) {
    // I'm using setTimeout to artificially delay execution as well as making the asynchronous
    // nature of these requests obvious.
    setTimeout(function() {
      request("http://www.marksandspencer.com", function(error, response, body) {
        if (!error) {
          var parser = cheerio.load(body),
              offerText = parser("body > div:nth-child(11) > div.site-strip > ul > li:nth-child(1) > a").text();
          // We have some offer text, call success
          success(offerText);
        } else {
          // We had an error
          fail(error);
        }
      });
    }, 1000);
  },

  submitOffer: function(offer, success, fail) {
    setTimeout(function() {
      request({
        method: "POST",
        json:   true,
        body:   {offer: offer},
        uri:    "http://httpbin.org/post"
      }, function(error, response, body) {
        // If error then fail else success
        error ? fail(error) : success(body);
      });
    }, 500);
  }

};
