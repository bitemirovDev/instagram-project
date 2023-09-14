const Post = require('./models/Post')

const isAuthor = async(req, res, next) =>{
    const id = req.params.id || req.body.id
    const post = await Post.findByPk(id)

    if(!post){
        res.status(400).send({message: 'Поста с данным id не существует'})
    }else if(post && req.user.id === post.user_id){
        next()
    }else{
        res.status(403).send({message: 'Вы не автор'})
    } 
}

module.exports = {
    isAuthor
}