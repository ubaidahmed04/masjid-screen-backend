const express = require('express');
const AddPrayerSchedule = require('../controllers/Schedule/addSchedule.js');
const GetPrayerSchedule = require('../controllers/Schedule/getSchedule.js');
const authentication = require('../middlewares/authmiddleware.js');
const DeletePrayerByName = require('../controllers/Schedule/deleteSchedule.js');


const ScheduleRoute =  express.Router()
ScheduleRoute.post("/addSchedule",authentication, AddPrayerSchedule)
ScheduleRoute.get("/getSchedule",authentication, GetPrayerSchedule)
ScheduleRoute.delete("/deleteSchedule",authentication, DeletePrayerByName)

module.exports = ScheduleRoute