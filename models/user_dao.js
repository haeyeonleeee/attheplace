const myDataSource = require('./init');


const createUser = async (email, nickName, hashedPw) => {
  return await myDataSource.query(`
  INSERT INTO users (email, nickName, password)
  VALUE (?, ?, ?)
  ` , [email, nickName, hashedPw])
}

const getEmail = async (email) => {
  const [user] = await myDataSource.query(`
  SELECT email
  FROM users
  WHERE email = ?
  `, [email]);
  return user
}

module.exports = { createUser, getEmail }