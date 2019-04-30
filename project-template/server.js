const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

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

app.get('/api/requests/:id', (req, res) => {
  let requestId;
  try {
    requestId = new ObjectId(req.params.id);
  }
  catch (error) {
    res.status(422).json({ message: `Invalid request ID format: ${error}` });
    return;
  }

  db.collection('ez-lease').find({ _id: requestId }).limit(1)
  .next()
  .then(request => {
    if (!request) res.status(404).json({ message: `No such request: ${requestId}` });
    else res.json(request);
  })
  .catch(error => {
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