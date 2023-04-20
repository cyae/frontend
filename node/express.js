const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');

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
app.set('views', './node/view');

// create middleware to include static files
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/img'));

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

// user router middleware
app.use('/user', userRouter);

// ROUTER
app.get('/desc', (req, res) => {
  res.render('desc');
});

// redirect
app.get('/', (req, res) => {
  res.redirect('/user');
});

// default: 404
app.use((req, res) => {
  res.status(404).render('jerry');
});
