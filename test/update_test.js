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
      name: "Joe",
      likes: 0
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
    assertName(User.update({ name: "Joe" }, { name: "Mart" }), done);
  });

  it("A model class can update one record", done => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Mart" }), done);
  });

  it("A model class can find a record with an Id and update", done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Mart" }), done);
  });

  it("A user can have their postcount incremented by 1", done => {
    User.update({ name: "Joe" }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.likes === 1);
        done();
      });
  });
});
