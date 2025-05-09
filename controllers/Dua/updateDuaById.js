const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../../constants/index.js');
const DuaModel = require("../../models/dua.model.js")

const UpdateSingleDua = async (req, res) => {
    const { UID, duaId } = req.query;
    const { type, content } = req.body;
    if (!UID || !duaId) {
        return res.status(404).json({ message: 'Id is Required' });
    }
    try {
        const result = await DuaModel.updateOne(
            { UID, "duas._id": duaId },
            {
                $set: {
                    "duas.$.type": type,
                    "duas.$.content": content
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Dua not found or already up to date" });
        }

        res.status(200).json({ message: "Dua updated successfully" });

    } catch (error) {
        console.error("Error updating dua:", error);
        res.status(500).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
};

module.exports = UpdateSingleDua