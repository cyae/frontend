const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

// Just like Controller layer in Spring!
// Homepage
router.get('/', userController.user_index);

// CRUD
router.post('/create', userController.user_create);

router.get('/all', userController.user_get_all);

router.get('/single', userController.user_get_single);

router.delete('/clear', userController.user_clear);

module.exports = router;
