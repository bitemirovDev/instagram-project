const multer = require('multer')

const postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Posts/Media')
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.split('.')
        ext = ext[ext.length - 1]
        const unique = Date.now() + '.' + ext
        cb(null, unique)
    }
})

const upload = multer({storage: postStorage})

module.exports = {upload}