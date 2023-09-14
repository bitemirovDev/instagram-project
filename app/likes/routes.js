const express = require('express')
const router = express.Router()
const {addLike, deleteLike} = require('./controllers')
const {isAuthorOfLike} = require('./middlewear')
const passport = require('passport')

router.post('/api/:entity_type/:entity_id/like', passport.authenticate('jwt', {session: false}), addLike)
router.delete('/api/:entity_type/:entity_id/like/:like_id', passport.authenticate('jwt', {session: false}), isAuthorOfLike, deleteLike)

module.exports = router