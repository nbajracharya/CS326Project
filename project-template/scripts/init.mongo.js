// NEW

// Connect to the issuetracker database. Note, if the issuetracker database
// does not exist, it will create it with this call.
db = new Mongo().getDB('ez-lease');
// Next, we remove everything inside it. This is helpful to ensure that the
// database starts from a known state.
db.requests.remove({});

// Now, we insert some mock data that mirrors the data that we have in the
// in-memory version of the `server.js` code.
db.requests.insert([
  {
    name: "Water is leaking through ceiling!!"
  }
]);