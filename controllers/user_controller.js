const userService = require('../services/user_services')

const signUp = async (req, res) => {
  try {
    const { email, nickName, password, checkPassword } = req.body;
    await userService.signUp(email, nickName, password, checkPassword);
    res.status(201).json({ message: '회원가입 완료' });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const checkDupMail = async (req, res) => {
  try {
    const { email } = req.body;
    await userService.checkDupMail(email)
    res.status(200).json({ message: '사용가능한 이메일 입니다' });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.logIn(email, password)
    res.status(200).json({ message: '로그인 완료' });
  } catch (err) {
    console.log(err);
    res.status(err.statusCOde || 500).json({ message: err.message })
  }
}

module.exports = { signUp, checkDupMail, logIn }