const express = require("express")
const router = express.Router();
const Attendance_Controller = require('../Controller/Attendance_Controller')
const Auth_Middleware = require('../Middleware/Auth_Middleware')
const bodyParser = require('body-parser')


router.use(express.json())
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}))



router.route('/add_attendance').post(Auth_Middleware,Attendance_Controller.Add_attendance)
router.route('/get_attendance').get(Auth_Middleware,Attendance_Controller.Get_attendance)


module.exports = router;