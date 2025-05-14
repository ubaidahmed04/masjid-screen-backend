const express = require('express');
const authentication = require('../middlewares/authmiddleware.js');
// const AddDua = require('../controllers/Dua/addDua.js');
const GetDua = require('../controllers/Dua/getDua.js');
const GetSingleDua = require('../controllers/Dua/getDuaById.js');
const UpdateSingleDua = require('../controllers/Dua/updateDuaById.js');
const DeleteSingleDua = require('../controllers/Dua/deleteDuaById.js');

const DuaRoutes = (io) => {
    const AddDuaRoute = require('../controllers/Dua/addDua.js')(io)
    const DuaRoute = express.Router()
    DuaRoute.post("/addDua", authentication, AddDuaRoute)
    DuaRoute.get("/getDua", authentication, GetDua)
    DuaRoute.get("/GetSingleDua", authentication, GetSingleDua)
    DuaRoute.put("/UpdateSingleDua", authentication, UpdateSingleDua)
    DuaRoute.delete("/DeleteDua", authentication, DeleteSingleDua)
    return DuaRoute
}

module.exports = DuaRoutes