const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const requestFieldType = {

    id: 'optional',
    name: 'required',

};

function validateRequest(name) {
  const errors = [];
  Object.keys(requestFieldType).forEach(field => {
    if (requestFieldType[field] === 'required' && !name[field]) {
      errors.push(`Missing mandatory field: ${field}`);
    }
  });
  return (errors.length ? errors.join('; ') : null);
}

function cleanupRequest(name) {
  const cleanedUpRequest = {};
  Object.keys(name).forEach(field => {
    if (requestFieldType[field]) cleanedUpRequest[field] = name[field];
  });
  return cleanedUpRequest;
}

app.get('/api/requests', (req, res) => {
  db.collection('requests').find().toArray().then(issues => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues })
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.post('/api/requests', (req, res) => {
  const newRequest = req.body;
  newRequest.created = new Date();

  const err = validateRequest(newRequest);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('requests').insertOne(newRequest).then(result =>
    db.collection('requests').find({ _id: result.insertedId }).limit(1).next()
  ).then(newRequest => {
    res.json(newRequest);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

// This route provides back-end support for deleting an issue.
// Note: It’s unlikely that an application will actually want
// to delete database records. Usually, records are marked 
// deleted and removed from listings. But for the sake of 
// CRUD completion, let’s also implement a Delete API.
app.delete('/api/requests/:id', (req, res) => {
  // Convert the string ID into an object.
  let requestId;
  try {
    requestId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid request ID format: ${error}` });
    return;
  }

  // Delete the issue object from the `issues` collection. If everything is successful
  // we will respond with a status "OK" result.
  db.collection('requests').deleteOne({ _id: requestId }).then((deleteResult) => {
    if (deleteResult.result.n === 1) res.json({ status: 'OK' });
    else res.json({ status: 'Warning: object not found' });
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

let db;
MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }).then(connection => {
  db = connection.db('ez-lease');
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});