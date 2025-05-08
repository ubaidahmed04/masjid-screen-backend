const User = require('../../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../../constants/index.js');

const loginUser = async (req, res) =>{
    const { UID, password} = req.body
    try {
        const user = await User.findOne({ UID });
        console.log("User",user)
        if (!user) {
            console.log("User not found:", UID);  // Debugging log
            return res.status(401).json({ message: 'User ID not found' });
        }
        if(user){
            let  isPasswordValid = await bcrypt.compare(password,user?.password) 
            if(!isPasswordValid){
                return res.status(401).json({ message: 'Password Invalid' });
            }
        }
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET,  { expiresIn: '168h' }) 
        res.status(200).json({
            token,
            data:user,
            message: "Login Successfull" 
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }

}

module.exports = loginUser