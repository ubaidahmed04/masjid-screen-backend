const PrayerScheduleModel = require('../../models/form.model.js');
const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../../constants/index.js');

const DeletePrayerByName = async (req, res) => {
    const { UID, prayerName } = req.body;

    if (!UID || !prayerName) {
        return res.status(400).json({ message: 'UID and prayerName are required' });
    }

    try {
        const schedule = await PrayerScheduleModel.findOne({ UID });

        if (!schedule) {
            return res.status(404).json({ message: 'Prayer schedule not found' });
        }

        const initialLength = schedule.prayers.length;

        schedule.prayers = schedule.prayers.filter(prayer => prayer.name !== prayerName);

        if (schedule.prayers.length === initialLength) {
            return res.status(404).json({ message: 'Prayer not found in schedule' });
        }

        await schedule.save();

        res.status(200).json({ message: 'Prayer deleted successfully', data: schedule });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
};

module.exports = DeletePrayerByName;
