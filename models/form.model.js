const mongoose = require('mongoose');

const PrayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    urdu_title: { type: String, required: true },
    timing: { type: String, required: true }
});

const PrayerScheduleSchema = new mongoose.Schema({
    UID: {
        type: String,
        required: true,
        unique: true,
        ref: 'User'
    },
    prayers: {
        type: [PrayerSchema],
        default: []  
    }
}, { timestamps: true });

module.exports = mongoose.model("PrayerSchedule", PrayerScheduleSchema);
