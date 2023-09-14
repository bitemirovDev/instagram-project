
const Story = require('./models/Story')
const fs = require('fs')
const path = require('path')
const { Op } = require('sequelize');

const createStory = async (req, res) =>{
    try {
        if(req.file){
            const story = await Story.create({
                user_id: req.user.id,
                media: `/Stories/Media/${req.file.filename}`,
            })
            res.status(200).send(story)
        }else{
            res.status(401).send({message: "История не может не содержать картинку, фото или видео"})
        }
    } catch (error) {
        res.status(500).send(error)
    }   
}

const getStories = async(req, res) =>{
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    try {
        const userStories = await Story.findAll({
            where: {
                user_id: req.params.id,
                createdAt: {
                    [Op.gte]: twentyFourHoursAgo,
                },
            },
        });

        res.status(200).send(userStories)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

const deleteStory = async (req, res) =>{
    try {
        const story = await Story.findByPk(req.params.id)
        if(story){
            fs.unlinkSync(path.join(__dirname + '../../../public/' + story.media))
            await story.destroy({
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
    createStory,
    deleteStory,
    getStories
}