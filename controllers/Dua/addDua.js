const { INTERNAL_SERVER_ERROR_MESSAGE } = require("../../constants/index.js");
const DuaModel  = require("../../models/dua.model.js")
const User = require('../../models/user.model.js');

const AddDua = async (req, res) => {
    const { UID, duas } = req.body;

    if (!UID || !Array.isArray(duas)) {
        return res.status(400).json({ message: 'UID and valid duas array are required' });
    }

    try {
        const user = await User.findOne({ UID });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        let duaDoc = await DuaModel.findOne({ UID });

        if (duaDoc) {
            // Append all new duas
            duas.forEach(dua => {
                duaDoc.duas.push(dua);
            });
        } else {
            duaDoc = new DuaModel({ UID, duas });
        }

        await duaDoc.save();
        res.status(201).json({ message: 'Duas saved successfully', data: duaDoc });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
}

module.exports = AddDua

