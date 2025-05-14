const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../../constants/index.js');
const DuaModel = require("../../models/dua.model.js")

const GetDua  = async (req, res) =>{
    const { UID , type, } = req.query;
    // console.log("user Id",UID)
    try {
        const duaDoc  = await DuaModel.find({UID})
        if (!duaDoc || duaDoc.length == 0 ) {
            return res.status(404).json({ message: 'No Duas found for this UID' });
        }
        
        let filteredDuas = duaDoc[0]?.duas;
        
        if (type) {
            filteredDuas = filteredDuas?.filter(dua => dua.type === type);
        }
        
        res.status(200).json({
            message: 'Dua fetched successfully',
            data: filteredDuas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
}

module.exports = GetDua