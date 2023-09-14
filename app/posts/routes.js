const express = require('express')
const router = express.Router()
const {createPost, getMyPosts, getPostById, getAllPosts, deletePost, editPost, getPostsByUsername} = require('./controllers')
const {upload} = require('./multer')
const passport = require('passport')
const {isAuthor} = require('./middlewear')

router.post('/api/post', passport.authenticate('jwt', {session: false}), upload.single('media'), createPost)
router.get('/api/post', passport.authenticate('jwt', {session: false}), getMyPosts)
router.get('/api/post/all', getAllPosts)
router.get('/api/post/:id', getPostById)
router.get('/api/posts/byUsername/:username', getPostsByUsername)
router.delete('/api/post/:id', passport.authenticate('jwt', {session: false}), isAuthor, deletePost)
router.put('/api/post/:id', passport.authenticate('jwt', {session: false}), isAuthor, upload.single('media'), editPost)

module.exports = router
