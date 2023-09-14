
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {jwtOptions} = require('../../config/passport-config')

const User = require('./models/User')
const Post = require('../posts/models/Post')
const Story = require('../stories/models/Story')
const Comment = require('../comments/models/Comment')
const Subscription = require('../subscriptions/Subscription')

const signUp = async (req, res) => {
    try {
        const where = {};

        if (req.body.email) {
            where.email = req.body.email;
        }
        if (req.body.phone) {
            where.phone = req.body.phone;
        }

        let user = await User.findOne({
            where: where,
        });
  
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
            if (
                (req.body.email && req.body.email.length > 5) ||
                (req.body.phone && req.body.phone.length > 10)
            ) {
                if (
                    req.body.user_name &&
                    req.body.user_name.length > 0 &&
                    req.body.full_name &&
                    req.body.full_name.length > 5 &&
                    req.body.password &&
                    req.body.password.length > 5
                ) {
                    user = await User.create({
                    email: req.body.email,
                    phone: req.body.phone,
                    user_name: req.body.user_name,
                    full_name: req.body.full_name,
                    password: hashedPassword,
                    });
                    res.status(200).send(user);
                } else {
                    res.status(401).send({ message: 'Validation error' });
                }
            } else {
                res.status(401).send({ message: 'Validation error' });
            }
        } else {
            res.status(401).send({
            message: 'Пользователь с таким email или телефоном уже существует',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
  
const logIn = async(req, res) =>{

    if(req.body.email && !req.body.phone && !req.body.user_name){
        if( !req.body.email || req.body.email.length === 0 ||
            !req.body.password || req.body.password.length === 0)
        {
            res.status(401).send({message: "Bad credentials"})
        } else {
            const user = await User.findOne({where: {email: req.body.email}})
     
            if(!user){
                return res.status(401).send({message: "User with this email not found"})
            }
     
            const isMatch = await bcrypt.compare(req.body.password, user.password)
    
            if(isMatch){
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    user_name: user.user_name
                }, jwtOptions.secretOrKey, { expiresIn: '1y' });
        
                res.status(200).send(token)
            }else{
                res.status(401).send({message: "Password is incorrect"})
            }
        }
    }

    if(req.body.phone && !req.body.email && !req.body.user_name){
        if( !req.body.phone || req.body.phone.length === 0 ||
            !req.body.password || req.body.password.length === 0)
        {
            res.status(401).send({message: "Bad credentials"})
        } else {
            const user = await User.findOne({where: {phone: req.body.phone}})
     
            if(!user){
                return res.status(401).send({message: "User with this phone not found"})
            }
     
            const isMatch = await bcrypt.compare(req.body.password, user.password)
    
            if(isMatch){
                const token = jwt.sign({
                    id: user.id,
                    phone: user.phone,
                    full_name: user.full_name,
                    user_name: user.user_name
                }, jwtOptions.secretOrKey, { expiresIn: '1y' });
        
                res.status(200).send(token)
            }else{
                res.status(401).send({message: "Password is incorrect"})
            }
        }
    }

    
    if(req.body.user_name && !req.body.email && !req.body.phone){
        if( !req.body.user_name || req.body.user_name.length === 0 ||
            !req.body.password || req.body.password.length === 0)
        {
            res.status(401).send({message: "Bad credentials"})
        } else {
            const user = await User.findOne({where: {user_name: req.body.user_name}})
     
            if(!user){
                return res.status(401).send({message: "User with this phone not found"})
            }
     
            const isMatch = await bcrypt.compare(req.body.password, user.password)
    
            if(isMatch){
                const token = jwt.sign({
                    id: user.id,
                    full_name: user.full_name,
                    user_name: user.user_name
                }, jwtOptions.secretOrKey, { expiresIn: '1y' });
        
                res.status(200).send(token)
            }else{
                res.status(401).send({message: "Password is incorrect"})
            }
        }
    }
}

const editUser = async(req, res) =>{
    const user = await User.findByPk(req.user.id)
    if(user){
        await user.update({
            email: req.body.email,
            phone: req.body.phone,
            user_name: req.body.user_name,
            full_name: req.body.full_name,
        }, 
        {
            where: {
                id: req.user.id
            }
        })
    }   

    res.status(200).end()
}

const getUserInfo = async(req, res) =>{
    const user = await User.findOne({
        where: {
            user_name: req.params.username
        },
        include: [
            {
                model: Post,
                as: 'posts',
                include: [
                    {
                        model: Comment,
                        as: 'comments'
                    }
                ]
            },
            {
                model: Story,
                as: 'stories'
            },
            {
                model: Subscription,
                as: 'following',
                include: [
                    {
                        model: User,
                        as: 'target',
                        attributes: ['id', 'user_name', 'full_name']
                    }
                ]
            },
            {
                model: Subscription,
                as: 'followers',
                include: [
                    {
                        model: User,
                        as: 'subscriber',
                        attributes: ['id', 'user_name', 'full_name']
                    }
                ]
            }
        ]
    })

    res.status(200).send(user)
}

module.exports = {
    signUp,
    logIn,
    editUser,
    getUserInfo
}