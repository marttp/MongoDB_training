const assert = require("assert");
const User = require("../src/user.js");

describe("Reading users out of the database", () => {
  let joe;
  beforeEach(done => {
    joe = new User({
      name: "Joe"
    });
    joe.save().then(() => {
      done();
    });
  });

  it("finds all users with a name of joe", done => {
    User.find({ name: "Joe" }).then(users => {
      //   console.log(users);

      // ! toString() : use it to campare in String type
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });
});