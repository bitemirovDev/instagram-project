const express = require('express')
const router = express.Router()
const passport = require('passport')
const {signUp, logIn, editUser, getUserInfo} = require('./controllers')
const {validateSignUp} = require('./middlewears')

router.post('/api/auth/signup', validateSignUp, signUp)
router.post('/api/auth/login', logIn)
router.put('/api/user/edit', passport.authenticate('jwt', {session: false}),  editUser)
router.get('/api/user/:username/info', getUserInfo)


module.exports = router