
const User = require('./models/User')

const validateSignUp = async(req, res, next) =>{
    try {
        let errors = {}

        if(!req.body.email && !req.body.phone){
            errors.phone_or_email = 'Поле Mobile number or Email обязательное'
        }
        if(!req.body.full_name || req.body.full_name.length === 0){
            errors.full_name = 'Поле Full Name обязательное'
        }
        if(!req.body.user_name || req.body.user_name.length === 0){
            errors.user_name = 'Поле Username обязательное'
        }
        if(!req.body.password || req.body.password.length === 0){
            errors.password = 'Поле Password обязательное'
        }
        
        const where = {};

        if (req.body.email) {
            where.email = req.body.email;
        }
        if (req.body.phone) {
            where.phone = req.body.phone;
        }

        const user = await User.findOne({
            where: where,
        });

        if(user){
            if(user.email === req.body.email){
                errors.email = "Пользователь с таким email уже зарегистрирован"
            }
            if(user.phone === req.body.phone){
                errors.phone = "Пользователь с таким phone уже зарегистрирован"
            }
        }else if(!user){
            const user_username = await User.findOne({
                where: {
                    user_name: req.body.user_name
                } 
            })

            if(user_username && user_username.user_name === req.body.user_name){
                errors.user_name = "Username занят другим пользователем, используйте другой"
            }
        }

        if(JSON.stringify(errors) !== JSON.stringify({})){
            res.status(400).send(errors)
        }else{
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

module.exports = {
    validateSignUp
}