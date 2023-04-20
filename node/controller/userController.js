const User = require('../model/user');

// Just like Service & DAO / Mapper layer in Spring!
const user_index = (req, res) => {
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
};

const user_create = (req, res) => {
  const user = new User(req.body);
  user
    .save() // save to DB
    .then(data => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

const user_get_all = (req, res) => {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err));
};

const user_get_single = (req, res) => {
  User.findById('64400297e2e720755b3902b1')
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err));
};

const user_clear = (req, res) => {
  User.deleteMany()
    .then(data => {
      res.json({ redirect: '/' });
    })
    .catch(err => console.log(err));
};

module.exports = {
  user_index,
  user_create,
  user_get_all,
  user_get_single,
  user_clear,
};
