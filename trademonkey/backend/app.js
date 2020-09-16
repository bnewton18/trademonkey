const express=require('express');
const bodyParser=require('body-parser');
const Credential=require('./models/credential');
const mongoose=require('mongoose');

const app = express();
const mongoUser = 'tmUser';
const mongoPW = 'BZDHeUWOtdWlVcNU';

const mongoConnection = 'mongodb+srv://' + mongoUser + ':' + mongoPW + '@cluster0.3yfkw.mongodb.net/trademonkey?retryWrites=true&w=majority';
mongoose.connect(mongoConnection)
  .then(() => {
    console.log('mongo connected!');
   })
  .catch(() => {
     console.log('connection error!!')
   });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get('/api/credentials/:name', (req, res, next) => {
  console.log('app.js: looking for credential:' + req.params.name);
  Credential.findOne({
    name: req.params.name
  }).then(document => {
    console.log(document);
      res.status(200).json({
        message: 'credential fetched',
        credential: document
      })})

})

app.post('/api/credentials', (req, res, next) => {
  const name = req.body.name;
  const value = req.body.value;
  console.log('app.post() - saving ' + name + '/' + value);
  Credential.findOneAndUpdate({name: name}, {value: value, expiration: Date.now()}, {upsert: true})
    .then(result => {
      console.log('document updated!');
    })
})
module.exports = app;
