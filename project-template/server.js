const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

app.get('/api/profile', (req, res) => {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
  
    db.collection('profile').find(filter).toArray().then(issues => {
      const metadata = { total_count: issues.length };
      res.json({ _metadata: metadata, records: issues })
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
  });
  
  app.post('/api/profile', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();
    if (!newIssue.status)
      newIssue.status = 'New';
  
    const err = validateIssue(newIssue);
    if (err) {
      res.status(422).json({ message: `Invalid request: ${err}` });
      return;
    }
  
    db.collection('profile').insertOne(newIssue).then(result =>
      db.collection('profile').find({ _id: result.insertedId }).limit(1).next()
    ).then(newIssue => {
      res.json(newIssue);
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
