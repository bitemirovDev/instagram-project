const Story = require('./models/Story')

const isAuthor = async(req, res, next) =>{
    try {
        const id = req.params.id || req.body.id
        const story = await Story.findByPk(id)

        if(!story){
            res.status(400).send({message: 'Истории с данным id не существует'})
        }else if(story && req.user.id === story.user_id){
            next()
        }else{
            res.status(403).send({message: 'Вы не автор'})
        } 
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    isAuthor
}