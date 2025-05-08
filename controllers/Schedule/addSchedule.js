const User = require('../../models/user.model.js');
const PrayerScheduleModel = require('../../models/form.model.js');
const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../../constants/index.js');

const AddPrayerSchedule = async (req, res) => {
    const { prayers, UID } = req.body;

    if (!UID || !Array.isArray(prayers)) {
        return res.status(400).json({ message: 'Invalid request body' });
    }

    try {
        const user = await User.findOne({ UID });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        let schedule = await PrayerScheduleModel.findOne({ UID });

        if (schedule) {
            prayers.forEach(prayer => {
                if (!prayer.name || !prayer.timing) return; // skip invalid entries
                const index = schedule.prayers.findIndex(p => p.name === prayer.name);
                if (index !== -1) {
                    schedule.prayers[index].timing = prayer.timing;
                } else {
                    schedule.prayers.push(prayer);
                }
            });
        } else {
            schedule = new PrayerScheduleModel({ UID, prayers });
        }

        await schedule.save();
        res.status(201).json({ message: 'Prayer schedule updated successfully', data: schedule });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
};

module.exports = AddPrayerSchedule;
