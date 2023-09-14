
const Post = require('./models/Post')
const User = require('../auth/models/User')
const Comment = require('../comments/models/Comment')
const Filter = require('./models/Filter')
const fs = require('fs')
const path = require('path')

const createPost = async (req, res) => {
    try {
        if(req.file){
            const post = await Post.create({
                user_id: req.user.id,
                media: `/Posts/Media/${req.file.filename}`,
                caption: req.body.caption,
                filter_id: req.body.filter_id
            })
            res.status(200).send(post)
        }else{
            res.status(401).send({message: "Пост не может не содержать картинку, фото или видео"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getMyPosts = async(req, res) =>{
    try {
        const posts = await Post.findAll({
            where: {
                user_id: req.user.id
            },
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Filter,
                    as: 'filter'
                },
                {
                    model: Comment,
                    as: 'comments'
                }
            ]
        })
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllPosts = async(req, res) =>{
    try {
        const posts = await Post.findAll()
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getPostById = async(req, res) =>{
    try {
        const post = await Post.findByPk(req.params.id)
        res.status(200).send(post)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getPostsByUsername = async(req, res) =>{
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                where: { 
                    user_name: req.params.username 
                },
            }],
        })

        res.status(200).send(posts)

    } catch (error) {
        res.status(500).send(error)
    }
    
}

const deletePost = async(req, res) =>{
    try {
        const post = await Post.findByPk(req.params.id)

        if(post){
            fs.unlinkSync(path.join(__dirname + '../../../public/' + post.media))
            await post.destroy({
                where: {
                    id: req.params.id
                }
            })
        }
        
        res.status(200).end()

    } catch (error) {
        res.status(500).send(error)
    }
}

const editPost = async(req, res) =>{
    try {
        const post = await Post.findByPk(req.params.id)
        if(post){
            fs.unlinkSync(path.join(__dirname + '../../../public/' + post.media))
            await post.update({
                user_id: req.user.id,
                media: `/Posts/Media/${req.file.filename}`,
                caption: req.body.caption
            }, 
            {
                where: {
                    id: req.params.id
                }
            })
        }   

        res.status(200).end()

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

module.exports = {
    createPost,
    getMyPosts,
    getAllPosts,
    getPostById,
    deletePost,
    editPost,
    getPostsByUsername
}