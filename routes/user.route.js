const express = require('express');
const loginUser = require('../controllers/User/login.js');
const RegisterUser = require('../controllers/User/register.js');


const userRoute =  express.Router()
userRoute.post("/login", loginUser)
userRoute.post("/register", RegisterUser)

module.exports = userRoute