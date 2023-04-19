const express = require('express');
const morgan = require('morgan');

const app = express();

// About view engine EJS:
// the .ejs files are stored on server, when request come in
// the EJS view engine will render .ejs to valid .html files, and then send them back to caller
// This is the so-called SERVER-SIDE RENDER.
app.set('view engine', 'ejs');
app.set('views', 'html');
app.listen(3001);

// create middleware to include static files
const root = __dirname.slice(0, __dirname.lastIndexOf('\\'))
app.use(express.static(root + '/css'))
app.use(express.static(root + '/img'))

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
})

// 3rd-party middleware for logging
app.use(morgan('dev'));

app.get('/', (req, res) => {
    const dataFromDB = 'some data'; // fectch data from other sources, like DB, MQ, Net, Disk etc.
    let newbies = ['曹玥琦', '陈晓淞'];
    if (newbies.length > 0) {
        newbies = newbies.join('、');
    }
    res.render('index', { title: dataFromDB, newbies }); // pass the fetched data through an object
})

app.get('/desc', (req, res) => {
    res.render('desc');
})

// redirect
app.get('/index', (req, res) => {
    res.redirect('/');
})

// default: 404
app.use((req, res) => {
    res.status(404).render('jerry');
})
