
const Post = require('../posts/models/Post')
const Comment = require('../comments/models/Comment')
const Story = require('../stories/models/Story')
const Like = require('../likes/models/Like')

const addLike = async(req, res) =>{
    try {
        const { entity_type, entity_id } = req.params;

        if (entity_type === 'post') {
            const post = await Post.findOne({
                where: {
                    id: entity_id
                }
            })

            if(post){
                await Like.create({
                    user_id: req.user.id,
                    entity_type: entity_type,
                    entity_id: entity_id,
                })
                res.status(200).end()
            }else{
                res.status(404).send({message: "Пост не найден"})
            }
        } else if (entity_type === 'comment') {
            const comment = await Comment.findOne({
                where: {
                    id: entity_id
                }
            })

            if(comment){
                await Like.create({
                    user_id: req.user.id,
                    entity_type: entity_type,
                    entity_id: entity_id,
                })
                res.status(200).end()
            }else{
                res.status(404).send({message: "Комментарий не найден"})
            } 
        } else if (entity_type === 'story') {
            const story = await Story.findOne({
                where: {
                    id: entity_id
                }
            })

            if(story){
                await Like.create({
                    user_id: req.user.id,
                    entity_type: entity_type,
                    entity_id: entity_id,
                })
                res.status(200).end()
            }else{
                res.status(404).send({message: "История не найдена"})
            } 
        } else {
            res.status(400).json({ message: 'Неподдерживаемый тип сущности' });
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteLike = async(req, res) =>{
    const { entity_type, entity_id, like_id } = req.params;

    if (entity_type === 'post') {
        const post = await Post.findOne({
            where: {
                id: entity_id
            }
        })

        if(post){
            await Like.destroy({
                where: {
                    entity_type: entity_type,
                    entity_id: entity_id,
                    id: like_id
                }
            })
            res.status(200).end()
        }else{
            res.status(404).send({message: "Пост не найден лайка"})
        }
    } else if (entity_type === 'comment') {
        const comment = await Comment.findOne({
            where: {
                id: entity_id
            }
        })

        if(comment){
            await Like.destroy({
                where: {
                    entity_type: entity_type,
                    entity_id: entity_id,
                    id: like_id
                }
            })
            res.status(200).end()
        }else{
            res.status(404).send({message: "Комментарий не найден"})
        }
    } else if (entity_type === 'story') {
        const story = await Story.findOne({
            where: {
                id: entity_id
            }
        })

        if(story){
            await Like.destroy({
                where: {
                    entity_type: entity_type,
                    entity_id: entity_id,
                    id: like_id
                }
            })
            res.status(200).end()
        }else{
            res.status(404).send({message: "История не найдена"})
        }
    } else {
        return res.status(400).json({ message: 'Неподдерживаемый тип сущности' });
    }
}

module.exports = {
    addLike,
    deleteLike
}