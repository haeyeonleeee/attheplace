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

const getEmailPassword = async (email) => {
  const [loginInfo] = await myDataSource.query(`
  SELECT id, email, password
  FROM users
  WHERE email = ?
  `, [email]);
  return loginInfo
};

module.exports = { createUser, getEmail, getEmailPassword }