const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const { secretKey } = require('./config'); // Создайте файл config.js и определите в нем секретный ключ для подписи токена

const User = require('../app/auth/models/User')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    // В этом месте вы можете добавить код для проверки пользователя по данным, полученным из токена.
    // Например, проверка, существует ли пользователь с данным ID в базе данных.
    // Возможно, вы также захотите добавить проверки срока действия токена и т. д.
    // Если пользователь существует, вызовите done(null, user) для успешной аутентификации,
    // в противном случае вызовите done(null, false) или done(error) для неудачной аутентификации.
    // payload содержит данные из токена, которые вы определили при его создании.

    const user = await User.findByPk(payload.id)

    if(user) done(null, user)
    else done(null, false)
  })
);

module.exports = {
    jwtOptions
}