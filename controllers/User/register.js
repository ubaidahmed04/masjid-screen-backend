const bcrypt = require('bcryptjs');
const User = require('../../models/user.model.js');
const { POST_DATA_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE } = require('../../constants/index.js');


const RegisterUser = async (req, res) =>{
    const { UID, mosqueName, MosqueArea, password} = req.body
    try {
        const IsUserExist = await User.findOne({UID})
        if(IsUserExist){
            return res.status(400).json({ message: 'User already exists' });  
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            UID, mosqueName, MosqueArea, password:hashedPassword
        })
        await newUser.save()
        res.status(201).json({message:POST_DATA_MESSAGE})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
}

module.exports = RegisterUser