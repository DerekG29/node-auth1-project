const Users = require('../../data/db-config');

module.exports = {
  find,
  findBy,
  findById,
  add
}

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
async function find() {
  const users = await Users('users')
    .select('user_id', 'username');
  return users;
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
async function findBy(filter) {
  const users = await Users('users')
    .where(filter)
    .select('user_id', 'username');
  return users;
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
async function findById(user_id) {
  const user = await Users('users')
    .where({ user_id })
    .first()
    .select('user_id', 'username')
  return user;
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const [id] = await Users('users')
    .insert(user)

  return findById(id)
}

// Don't forget to add these to the `exports` object so they can be required in other modules
