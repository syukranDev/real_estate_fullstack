const express = require('express')
const userRoute = express.Router()
const jwtCheck = require('../config/auth0Config.js')

const {createUser, bookVisit, getAllBookings, cancelBooking, favouriteBooking, getAllFavourites} = require("../controllers/userController")

userRoute.post('/register', jwtCheck , createUser)
userRoute.post('/bookVisit/:id', jwtCheck,  bookVisit)
userRoute.get('/getAllBookings', getAllBookings)
userRoute.post('/removeBooking/:id', jwtCheck, cancelBooking)
userRoute.post('/toFav/:rid', jwtCheck, favouriteBooking)
userRoute.post('/getAllFavourites', jwtCheck, getAllFavourites)


module.exports = userRoute