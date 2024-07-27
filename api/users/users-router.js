const express = require('express');

const router = express.Router();

const {
  restricted
} = require('../auth/auth-middleware');

const {
  find
} = require('./users-model');

router.get('/', restricted, (req, res, next) => {
  find()
    .then(users => {
      res.json(users);
    })
    .catch(next)
});

module.exports = router;