const express = require('express')
const router = express.Router()
const {createStory, deleteStory, getStories} = require('./controllers')
const {upload} = require('./multer')
const passport = require('passport')
const {isAuthor} = require('./middlewear')

router.post('/api/story', passport.authenticate('jwt', {session: false}), upload.single('media'), createStory)
router.get('/api/story/:id', getStories)
router.delete('/api/story/:id', passport.authenticate('jwt', {session: false}), isAuthor, deleteStory)

module.exports = router