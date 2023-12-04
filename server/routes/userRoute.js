const express = require('express')
const userRoute = express.Router()

const {createUser, bookVisit, getAllBookings, cancelBooking, favouriteBooking, getAllFavourites} = require("../controllers/userController")

userRoute.post('/register', createUser)
userRoute.post('/bookVisit/:id', bookVisit)
userRoute.get('/getAllBookings', getAllBookings)
userRoute.post('/removeBooking/:id', cancelBooking)
userRoute.post('/toFav/:rid', favouriteBooking)
userRoute.post('/getAllFavourites', getAllFavourites)


module.exports = userRoute