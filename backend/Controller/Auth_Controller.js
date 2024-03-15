const UserFromModel = require('../Model/User_Model')
const bcrypt = require('bcrypt');
const User = require('../Model/User_Model');

//Signup Logic
const ragister = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, email, password } = req.body;
        const userExist = await UserFromModel.findOne({ email: email })
        if (userExist) {
            res.status(400).json({ message: "User Already ragisterd" })
        }
        const users = new User({
            name: name,
            email: email,
            password: password,
            images: req.file.filename
        });
        const userData = await users.save();
        const userId = userData._id;

        res.status(201).json({
            message: "User created",
            userData,
            token: await userData.generateToken(),
            userId: userData._id.toString()
        })
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await UserFromModel.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ message: "User not found" })
        }
        if (!password) {
            return res.status(404).json({ message: "Enter Password" })
        }
        const isMatch = await userExist.compare_Pass(password);
        if (isMatch) {
            res.status(200).json({
                message: "User Found",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            })
        }
        else {
            res.status(401).json({ error: "Wrong Password" })
        }
    } catch (error) {
        res.status(401).json({ error: "wrong Credential" })
    }
}

//User data (send user data who is logged in)
const user = async (req, res) => {
    try {
        const userData = req.user;
        // const photoData = req.photo
        return res.status(200).json({ userData })/* .senFile(photoData) */;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    ragister,
    login,
    user
}