const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongooose = require('mongoose');

const app = express();
mongooose.connect("mongodb+srv://bsn:bsn18M0n@cluster0.xogow.mongodb.net/mean-course?retryWrites=true&w=majority")
  .then(() => {
      console.log("connect to mongo!");
    })
  .catch(()=> {
    console.log('connection error')
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req,res,next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
//   next();
// });

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

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'post added',
      newPostId: post._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched',
        posts: documents
      })
    });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post)
    .then(result => {
    console.log(result);
    res.status(200).json({message: 'update done!'});
  })
})

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'post deleted!'
    })
  });
})


module.exports = app;
