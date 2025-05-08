const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Use bcryptjs

const userSchema = new mongoose.Schema({
    mosqueName: {
        type: String,
        required: true
    },
    UID: {
        type: String,
        required: true,
        unique:true
    },
    MosqueArea: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{ timestamps: true });



module.exports = mongoose.model("User", userSchema);

