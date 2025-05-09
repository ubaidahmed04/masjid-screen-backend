const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../../constants/index.js');
const DuaModel = require("../../models/dua.model.js")

const GetSingleDua = async (req, res) => {
    const { UID, duaId } = req.query;

    try {
        const duaDoc = await DuaModel.findOne({ UID });

        if (!duaDoc) {
            return res.status(404).json({ message: 'No Duas found for this UID' });
        }

        const singleDua = duaDoc.duas.find(dua => dua._id.toString() === duaId);

        if (!singleDua) {
            return res.status(404).json({ message: 'Dua not found with this ID' });
        }

        res.status(200).json({
            message: 'Dua fetched successfully',
            data: singleDua,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
};

module.exports = GetSingleDua