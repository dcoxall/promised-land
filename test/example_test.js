var mns    = require("../lib/example.js"),
    expect = require("chai").expect;

describe("Example Tests", function() {

  it("fetches the latest offer", function() {
    return mns.getOffer()
      .then(function(offer) {
        expect(offer).to.be.eq("MOTHER'S DAY FLOWER OFFERS - LIMITED TIME ONLY");
      });
  });

  it("submits an offer", function() {
    return mns.submitOffer("My Example Offer")
      .then(function(result) {
        expect(result.json.offer).to.be.eq("My Example Offer");
      });
  });

  it("can fetch an offer and then submit it", function() {
    return mns.submitOffer(mns.getOffer())
      .then(function(result) {
        expect(result.json.offer).to.be.eq("MOTHER'S DAY FLOWER OFFERS - LIMITED TIME ONLY");
      });
  });

});
