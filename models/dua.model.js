const mongoose = require('mongoose');

const singleDuaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['topDua', 'bottomDua'],
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const duaSchema = new mongoose.Schema({
    UID: {
        type: String,
        required: true,
        unique: true,
        ref: 'User'
    },
    duas: [singleDuaSchema]
}, { timestamps: true });

module.exports = mongoose.model("Dua", duaSchema);
