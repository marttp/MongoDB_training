const mongoose = require("mongoose");

// Left side : when ever you want to create a promise on mongoose
// Right side : tell Promise to use this library
mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect("mongodb://localhost/users_test", { useNewUrlParser: true });
  mongoose.connection
    .once("open", () => done())
    .on("error", error => {
      console.warn("Warning", error);
    });
});

// Hook
beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;

  // ! delete all collection before test
  /*
    mongoose.connection.collections.users.drop(() => {
      // ! Ready to run the next test!
      done();
    });
  */

  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
