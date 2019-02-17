// use assert for compare the result. true ? Pass : Fail
const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;

  const assertName = (operation, done) => {
    operation
      .then(() => User.find({}))
      .then(user => {
        assert(user.length === 1);
        assert(user[0].name === "Mart");
        done();
      });
  };

  beforeEach(done => {
    joe = new User({
      name: "Joe"
    });
    joe.save().then(() => done());
  });

  it("instance type using set and save", done => {
    joe.set("name", "Mart");
    // joe
    //   .save()
    //   .then(() => User.find({}))
    //   .then(user => {
    //     assert(user.length === 1);
    //     assert(user[0].name === "Mart");
    //     done();
    //   });
    assertName(joe.save(), done);
  });

  it("A model instance can update", done => {
    assertName(joe.update({ name: "Mart" }), done);
  });
});
