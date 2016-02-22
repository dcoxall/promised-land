var mns    = require("../lib/example.js"),
    expect = require("chai").expect;

describe("Example Tests", function() {

  it("fetches the latest offer", function() {
    // Mocha supports promises simply by returning them and removing the done callback
    // We can now chain steps onto our promises. So below we getOffer and THEN using the
    // result we make our assertions. Mocha automatically knows when the chain has ended.
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
    // Because both our functions return promises we can now chain them together
    // without having to nest callbacks.
    return mns.getOffer()    // get the offer
      .then(mns.submitOffer) // submit the result of the previous step
      .then(function(result) {
        // Assert the result of the previous step
        expect(result.json.offer).to.be.eq("MOTHER'S DAY FLOWER OFFERS - LIMITED TIME ONLY");
      });
  });

});
