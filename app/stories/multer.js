const multer = require('multer')

const storyStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Stories/Media')
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.split('.')
        ext = ext[ext.length - 1]
        const unique = Date.now() + '.' + ext
        cb(null, unique)
    }
})

const upload = multer({storage: storyStorage})

module.exports = {upload}