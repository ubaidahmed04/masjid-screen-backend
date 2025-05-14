const express = require('express');
// const AddPrayerSchedule = require('../controllers/Schedule/addSchedule.js');
const GetPrayerSchedule = require('../controllers/Schedule/getSchedule.js');
const authentication = require('../middlewares/authmiddleware.js');
const DeletePrayerByName = require('../controllers/Schedule/deleteSchedule.js');


const ScheduleRoute = (io) => {

    const router = express.Router()
    const AddPrayerSchedule = require('../controllers/Schedule/addSchedule.js')(io);
    router.post("/addSchedule", authentication, AddPrayerSchedule)
    router.get("/getSchedule", authentication, GetPrayerSchedule)
    router.delete("/deleteSchedule", authentication, DeletePrayerByName)
    return router
}

module.exports = ScheduleRoute