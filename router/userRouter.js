const express = require('express');
const User = require('../node/models/user');

const router = express.Router();

// CRUD
router.post('/create', (req, res) => {
  const user = new User(req.body);
  user
    .save() // save to DB
    .then(data => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

router.get('/all', (req, res) => {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

router.get('/single', (req, res) => {
  User.findById('64400297e2e720755b3902b1')
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err));
});

router.delete('/clear', (req, res) => {
  User.deleteMany()
    .then(data => {
      res.json({ redirect: '/' });
    })
    .catch(err => console.log(err));
});

module.exports = router;
