const express = require('express')
const router = express.Router()
const {subscribeUser, unsubscribeUser, getUserFollowersByUsername, getUserSubscriptionsByUsername} = require('./controllers')
const passport = require('passport')

router.post('/api/subscribe/:id', passport.authenticate('jwt', {session: false}), subscribeUser)
router.delete('/api/unsubscribe/:id', passport.authenticate('jwt', {session: false}), unsubscribeUser)
router.get('/api/followers/byUsername/:username', getUserFollowersByUsername);
router.get('/api/subscriptions/byUsername/:username', getUserSubscriptionsByUsername)

module.exports = router