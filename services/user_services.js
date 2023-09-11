const bcrypt = require('bcryptjs')
const userDao = require('../models/user_dao')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRETKEY

const signUp = async (email, nickName, password, checkPassword) => {

  const REQUIRED_KEYS = { email, nickName, password, checkPassword };
  Object.keys(REQUIRED_KEYS).map((key) => {
    if (!REQUIRED_KEYS[key]) {
      const error = new Error(`${key}를 입력하세요`);
      error.statusCode = 400;
      throw error;
    }
  });

  if (!(password === checkPassword)) {
    const error = new Error('비밀번호가 일치하지 않습니다');
    error.statusCode = 400;
    throw error;
  }


  const emailFormCheck =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (emailFormCheck.test(email) == false) {
    const error = new Error('이메일 형식이 올바르지 않습니다.');
    error.statusCode = 400;
    throw error;
  }

  const passwordFormCheck =
    /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
  if (passwordFormCheck.test(password) == false) {
    const error = new Error('비밀번호 형식이 올바르지 않습니다.');
    error.statusCode = 400;
    throw error;
  }


  const salt = bcrypt.genSaltSync()
  const hashedPw = bcrypt.hashSync(password, salt);

  const createUser = await userDao.createUser(email, nickName, hashedPw);
  return createUser;
};

const checkDupMail = async (email) => {

  if (!email) {
    const error = new Error('이메일을 입력하세요');
    error.statusCode = 400;
    throw error;
  }

  const emailDuplicateCheck = await userDao.getEmail(email)
  if (emailDuplicateCheck) {
    const error = new Error('이미 사용중인 이메일입니다.')
    error.statusCode = 400;
    throw error;
  }
};

const logIn = async (email, password) => {

  const REQUIRED_KEYS = { email, password };
  Object.keys(REQUIRED_KEYS).map((key) => {
    if (!REQUIRED_KEYS[key]) {
      const error = new Error(`${key}를 입력하세요`);
      error.statusCode = 400;
      throw error;
    }
  });

  const emailFormCheck =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (emailFormCheck.test(email) == false) {
    const error = new Error('이메일 형식이 올바르지 않습니다.');
    error.statusCode = 400;
    throw error;
  }

  const loginInfo = await userDao.getEmailPassword(email)

  if (!loginInfo) {
    const error = new Error('존재하지 않는 이메일입니다.')
    error.statusCode = 400;
    throw error;
  }

  const isPasswordCorrect = bcrypt.compareSync(password, loginInfo.password)

  if (!isPasswordCorrect) {
    const error = new Error('비밀번호가 일치하지 않습니다')
    error.statusCode = 400
    throw error
  }

  if (loginInfo.email && isPasswordCorrect) {
    const token = jwt.sign({ email: loginInfo.email }, SECRET_KEY)
    return {
      accessToken: token, id: loginInfo.id
    };
  }
}

module.exports = { signUp, checkDupMail, logIn }