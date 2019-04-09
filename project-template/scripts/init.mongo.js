// NEW

// Connect to the issuetracker database. Note, if the issuetracker database
// does not exist, it will create it with this call.
db = new Mongo().getDB('Profile');

// Next, we remove everything inside it. This is helpful to ensure that the
// database starts from a known state.
db.issues.remove({});

// Now, we insert some mock data that mirrors the data that we have in the
// in-memory version of the `server.js` code.
db.issues.insert([
  {name: "John Doe", email: "jdoe@thatmail.com", number: 4177677787,
  address: "1800 Sour Drive, Sunnyvale, CA, 94019", manager: "David Murray",
  balance: "$"+ 0.00, leaseEnd: Date(2020,13,0)},]);

// Lastly, we create "indexes" to make searching faster. For this particular
// application we know that searching on the status, owner, and created properties
// will be common, so we create indexes on those.
db.issues.createIndex({ name: 1 });
db.issues.createIndex({ number: 1 });
db.issues.createIndex({ address: 1 });