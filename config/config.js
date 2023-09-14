const fs = require('fs')
const path = require('path')

module.exports = {
    development: {
        username: 'admin',
        password: 'root',
        database: 'admin',
        host: 'localhost',
        dialect: 'postgres', 
    },
    production: {
        username: 'doadmin',
        password: 'AVNS_seGuic7qxo6UMEIDtH5',
        database: 'defaultdb',
        host: 'db-postgresql-sgp1-99628-do-user-14613666-0.b.db.ondigitalocean.com',
        dialect: 'postgres',
        port: 25060,
        dialectOptions: {
            ssl:{
                ca: fs.readFileSync(path.resolve("config", "ca-certificate.crt"))
            }
        }
    },
    secretKey: 'секретный_ключ'
};