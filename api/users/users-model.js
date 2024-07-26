const Users = require('../../data/db-config');

module.exports = {
  find,
  findBy,
  findById,
  add
}

function find() {
  return Users('users')
    .select('user_id', 'username');
}

function findBy(filter) {
  return Users('users')
    .where(filter)
    .select('user_id', 'username');
}

function findById(user_id) {
  return Users('users')
    .where({ user_id })
    .first()
    .select('user_id', 'username')
}

async function add(user) {
  const [id] = await Users('users')
    .insert(user)

  return findById(id)
}
