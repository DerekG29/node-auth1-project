const users = require('../users/users-model')

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
  checkPayload
}

function restricted(req, res, next) {
  try {
    if (req.session.user) {
      next();
    } else {
      next({ status: 401, message: 'You shall not pass!' });
    }
  } catch (err) {
    next(err);
  }
}

async function checkUsernameFree(req, res, next) {
  try {
    const { username } = req.body;
    const result = await users.findBy({ username });
    if (result.length) {
      next({ status: 422, message: 'Username taken' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkUsernameExists(req, res, next) {
  try {
    const { username } = req.body;
    const result = await users.findBy({ username });
    if (!result.length) {
      next({ status: 401, message: 'Invalid credentials' });
    } else {
      req.body.user = result[0];
      next();
    }
  } catch (err) {
    next(err);
  }
}

function checkPasswordLength(req, res, next) {
  try {
    const { password } = req.body;
    if (!password || password.length <= 3) {
      next({ status: 422, message: 'Password must be longer than 3 chars' });
    } else {
      next(); 
    }
  } catch (err) {
    next(err);
  }
}

function checkPayload(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username) {
      next({ status: 422, message: 'username is required' });
    } else
    if (!password) {
      next({ status: 422, message: 'password is required' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}
