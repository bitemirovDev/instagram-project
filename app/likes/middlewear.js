const Like = require('../likes/models/Like')

const isAuthorOfLike = async(req, res, next) =>{
    const id = req.params.like_id
    const like = await Like.findByPk(id)

    if(!like){
        res.status(400).send({message: 'Лайка с данным id не существует'})
    }else if(like && req.user.id === like.user_id){
        next()
    }else{
        res.status(403).send({message: 'Вы не автор'})
    } 
}

module.exports = {
    isAuthorOfLike
}