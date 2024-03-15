const express = require("express");
const router = express.Router();
const Auth_Controller = require('../Controller/Auth_Controller')
const Auth_Middleware = require('../Middleware/Auth_Middleware');
const bodyParser = require('body-parser')

router.use(express.json())

//This will helps to get the data from the form in 'views'
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

const multer = require("multer");
const path = require("path");

router.use(express.static('Public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Public/images'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

router.route('/ragister').post(upload.single('images'), Auth_Controller.ragister)
router.route('/login').post(Auth_Controller.login)
router.route('/user').get(Auth_Middleware, Auth_Controller.user)


module.exports = router;