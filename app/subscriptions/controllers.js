const Subscription = require('./Subscription')
const User = require('../auth/models/User')

const subscribeUser = async(req, res) =>{
    try {
        if(req.user.id != req.params.id){
            await Subscription.create({
                subscriber_id: req.user.id,
                target_id: req.params.id,
            });
            res.status(200).send('Подписка прошла успешно')
        }else{
            res.status(400).send('Вы не можете подписаться на самого себя')
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

const unsubscribeUser = async(req, res) =>{
    try {
        const unsubscribedUser = await User.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['user_name'], 
        });
    
        if(!unsubscribedUser){
            res.status(404).send('Пользователь, от которого вы хотите отписаться, не найден');
        }
    
        await Subscription.destroy({
            where: {
                subscriber_id: req.user.id,
                target_id: req.params.id,
            },
        });
        res.status(200).send(`Пользователь ${req.user.user_name} отписался от пользователя ${unsubscribedUser.user_name}`)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUserFollowersByUsername = async(req, res) =>{
    try {
        const user = await User.findOne({
            where: {
                user_name: req.params.username
            }
        })

        if(user){
            const followers = await Subscription.findAll({    
                where: {
                    subscriber_id: user.id
                },
                include: [{
                    model: User,
                    as: 'subscriber',
                    attributes: ['id', 'user_name', 'full_name']
                }]
            })
    
            res.status(200).send(followers)
        }else{
            res.status(404).send({message: "Пользователь не найден"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

const getUserSubscriptionsByUsername = async(req, res) =>{
    try {
        const user = await User.findOne({
            where: {
                user_name: req.params.username
            }
        })

        if(user){
            const subscriptions = await Subscription.findAll({    
                where: {
                    subscriber_id: user.id
                },
                include: [{
                    model: User,
                    as: 'target',
                    attributes: ['id', 'user_name', 'full_name']
                }]
            })
    
            res.status(200).send(subscriptions)
        }else{
            res.status(404).send({message: "Пользователь не найден"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}



module.exports = {
    subscribeUser,
    unsubscribeUser,
    getUserFollowersByUsername,
    getUserSubscriptionsByUsername
}