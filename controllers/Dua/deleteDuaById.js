const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../../constants/index.js');
const DuaModel = require("../../models/dua.model.js")

const DeleteSingleDua = async (req, res) => {
    const { UID, duaId } = req.query;
    if (!UID || !duaId) {
        return res.status(404).json({ message: 'Id is Required' });
    }
    try {
        const result = await DuaModel.updateOne(
            { UID },
            {
                $pull: {
                    duas: { _id: duaId }
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Dua not found or already deleted" });
        }

        res.status(200).json({ message: "Dua deleted successfully" });
    } catch (error) {
        console.error("Error deleting dua:", error);
        res.status(500).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }

};

module.exports = DeleteSingleDua