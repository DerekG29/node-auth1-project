const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
} = require('./auth-middleware');

const {
  add
} = require('../users/users-model');

router.post('/register',
  checkUsernameFree,
  checkPasswordLength,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const hash = bcrypt.hashSync(password, 8);
      const newUser = { username, password: hash };
      const result = await add(newUser);
      res.status(201).json(result);
    } catch (err) {
      next(err)
    }
  }
);

router.post('/login', checkUsernameExists, (req, res, next) => {
  try {
    const { password, user } = req.body;
    if (bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.json({ message: `Welcome ${user.username}` })
    } else {
      next({ status: 401, message: 'Invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session.user) {
    req.session.destroy(err => {
      if (err) {
        next(err)
      } else {
        res.json({ message: 'logged out' })
      }
    })
  } else {
    res.json({ message: 'no session' });
  }
});

module.exports = router;