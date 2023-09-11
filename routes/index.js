const express = require('express')
const router = express.Router();
const userRouter = require('./user_router')

router.get('/ping', (_, res) => { res.send('pong') })

router.use('/users', userRouter);

module.exports = router;