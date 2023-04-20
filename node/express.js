const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

const mongoURL =
  'mongodb+srv://qwe2645692:gbaEqW4NbL8tl8zb@cluster1.eapcjev.mongodb.net/mongodb?retryWrites=true&w=majority';
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => app.listen(3001))
  .catch(err => console.log(err));

// About view engine EJS:
// the .ejs files are stored on server, when request come in
// the EJS view engine will render .ejs to valid .html files, and then send them back to caller
// This is the so-called SERVER-SIDE RENDER.
app.set('view engine', 'ejs');
app.set('views', 'html');

// create middleware to include static files
const root = __dirname.slice(0, __dirname.lastIndexOf('\\'));
app.use(express.static(root + '/css'));
app.use(express.static(root + '/img'));

// DIY middleware to trace for safety
app.use((req, res, next) => {
  console.log('A new request comes in:');
  var trace = {};
  trace.host = req.hostname;
  trace.ip = req.ip;
  trace.path = req.path;
  trace.method = req.method;
  console.log(trace); // traces can be printed or saved to DB
  next(); // go on to another middleware below
});

// 3rd-party middleware for logging
app.use(morgan('dev'));

// express middleware for request parsing
app.use(express.urlencoded({ extended: true }));

// ROUTER
app.get('/', (req, res) => {
  const dataFromDB = 'some data'; // fectch data from other sources, like DB, MQ, Net, Disk etc.
  User.find()
    .sort({ createdAt: -1 }) // sort as recently created
    .then(data => {
      var newbies = '';
      if (data.length > 0) {
        data.forEach(user => {
          newbies += user.name + '、';
        });
      }
      res.render('index', {
        title: dataFromDB,
        newbies: newbies.slice(0, newbies.length - 1),
      }); // pass the fetched data through an object
    })
    .catch(err => console.log(err));
});

app.get('/desc', (req, res) => {
  res.render('desc');
});

// redirect
app.get('/index', (req, res) => {
  res.redirect('/');
});

// CRUD
app.post('/create-user', (req, res) => {
  const user = new User(req.body);
  user
    .save() // save to DB
    .then(data => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

app.get('/retrieve-all-user', (req, res) => {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.get('/retrieve-single-user', (req, res) => {
  User.findById('64400297e2e720755b3902b1')
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

app.delete('/', (req, res) => {
  User.deleteMany()
    .then(data => {
      res.json({ redirect: '/' });
    })
    .catch(err => console.log(err));
});

// default: 404
app.use((req, res) => {
  res.status(404).render('jerry');
});
