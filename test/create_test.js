// use assert for compare the result. true ? Pass : Fail
const assert = require("assert");
const User = require("../src/user");

describe("Creating records", () => {
  it("saves a user", done => {
    const joe = new User({
      name: "Joe"
    });
    joe.save().then(() => {
      // Has been saved successful

      // When already saved to db
      // isNew will trigger to false
      assert(!joe.isNew);
      done();
    });
  });
});
