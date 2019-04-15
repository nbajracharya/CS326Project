const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

const profileFieldType = {
  name: 'required',
  email: 'required', 
  number: 'required',
  address: 'required', 
  manager: 'required',
  balance: 'required', 
  leaseEnd: 'required',
};

function validateProfile(profile) {
  for (const field in profileFieldType)  {
    const type = profileFieldType[field];
    if  (!type) {
      delete profile[field];
    }
    else if (type === 'required' && !profile[field]) {
      return `${field} is required.`; 
    }
  }
  return null;
}

app.get('/api/profile', (req, res) => {
    const filter = {};
  
    db.collection('profile').find(filter).toArray().then(profiles => {
      const metadata = { total_count: profiles.length };
      res.json({ _metadata: metadata, records: profiles })
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
  });
  
  app.post('/api/profile', (req, res) => {
    const newProfile = req.body;
  
    const err = validateProfile(newProfile);
    if (err) {
      res.status(422).json({ message: `Invalid request: ${err}` });
      return;
    }
  
    db.collection('profile').insertOne(newProfile).then(result =>
      db.collection('profile').find({ _id: result.insertedId }).limit(1).next()
    ).then(newProfile => {
      res.json(newProfile);
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
