const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../../constants/index.js');
const PrayerScheduleModel = require('../../models/form.model.js');

const GetPrayerSchedule  = async (req, res) =>{
    const { UID } = req.query;
    console.log("user Id",UID)
    try {
        const schedules = await PrayerScheduleModel.find({UID})
        if(schedules.length == 0 ){
            return res.status(404).json({ message: 'No prayer schedule found for this user' });
        }
        res.status(200).json({
            message: 'Prayer schedule fetched successfully',
            data: schedules
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
}

module.exports = GetPrayerSchedule