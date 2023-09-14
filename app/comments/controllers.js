
const Post = require('../posts/models/Post')
const Comment = require('./models/Comment')
const User = require('../auth/models/User')

const createComment = async(req, res) =>{
    try {
        const post = await Post.findByPk(req.params.id)
        if(post){
            if(req.body.comment && req.body.comment.length > 0){
                const comment = await Comment.create({
                    user_id: req.user.id,
                    post_id: post.id,
                    comment: req.body.comment,
                })
                res.status(200).send(comment)
            }else{
                res.status(401).send('Комментарий не может быть пустым')
            }
        }else{
            res.status(401).send({message: "Пост не найден"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getComments = async(req, res) =>{
    try {
        const postComments = await Comment.findAll({
            where: {
                post_id: req.params.id,
            },
            include: [
                {
                    model: Post,
                    as: 'post'
                },
                {
                    model: User,
                    as: 'user'
                }]
        });
    
        if(postComments){
            res.status(200).send(postComments)
        }else{
            res.status(401).send('Комментарии не найдены')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteComment = async(req, res) =>{
    try {
        const comment = await Comment.findByPk(req.params.id)
        if(comment){
            await comment.destroy({
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

module.exports = {
    createComment,
    getComments,
    deleteComment
}