var mns    = require("../lib/example.js"),
    expect = require("chai").expect;

describe("Example Tests", function() {

  it("fetches the latest offer", function(done) {
    mns.getOffer(function(offer) {
      expect(offer).to.be.eq("MOTHER'S DAY FLOWER OFFERS - LIMITED TIME ONLY");
      // Done has to be called within callback as it is asynchronous
      done();
    }, done);
  });

  it("submits an offer", function(done) {
    mns.submitOffer("My Example Offer", function(result) {
      expect(result.json.offer).to.be.eq("My Example Offer");
      done();
    }, done);
  });

  it("can fetch an offer and then submit it", function(done) {
    // THIS IS WRONG
    var offer;
    mns.getOffer(function(value) {
      offer = value;
    }, done);
    mns.submitOffer(offer, function(result) {
      expect(result.json.offer).to.be.eq("MOTHER'S DAY FLOWER OFFERS - LIMITED TIME ONLY");
      done();
    }, done);
  });

});
