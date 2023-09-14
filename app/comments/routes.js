const express = require('express')
const router = express.Router()
const {createComment, getComments, deleteComment} = require('./controllers')
const passport = require('passport')
const {isAuthor} = require('./middlewear')

router.post('/api/post/comment/:id', passport.authenticate('jwt', {session: false}), createComment)
router.get('/api/post/comment/:id', getComments)
router.delete('/api/post/comment/:id', passport.authenticate('jwt', {session: false}), isAuthor, deleteComment)

module.exports = router