const Comment = require('./models/Comment')

const isAuthor = async(req, res, next) =>{
    const id = req.params.id || req.body.id
    const comment = await Comment.findByPk(id)

    if(!comment){
        res.status(400).send({message: 'Комментария с данным id не существует'})
    }else if(comment && req.user.id === comment.user_id){
        next()
    }else{
        res.status(403).send({message: 'Вы не автор'})
    } 
}

module.exports = {
    isAuthor
}