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

app.get('/api/requests', (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);

  db.collection('ez-lease').find(filter).toArray().then(issues => {
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

  db.collection('ez-lease').insertOne(newRequest).then(result =>
    db.collection('ez-lease').find({ _id: result.insertedId }).limit(1).next()
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
    // Respond with 422 (Unprocessable Entity) if there is a problem parsing
    // the object id: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422.
    res.status(422).json({ message: `Invalid request ID format: ${error}` });
    return;
  }

  // Delete the issue object from the `issues` collection. If everything is successful
  // we will respond with a status "OK" result.
  db.collection('ez-lease').deleteOne({ _id: requestId }).then((deleteResult) => {
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