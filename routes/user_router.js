const express = require("express")
const router = express.Router()
const userController = require('../controllers/user_controller')

router.post('/signup', userController.signUp)
router.post('/checkmail', userController.checkDupMail)
router.post('/login', userController.logIn)

module.exports = router;