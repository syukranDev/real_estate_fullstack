const express = require('express')
const residencyRoute = express.Router()
const jwtCheck = require('../config/auth0Config')

const {createResidency, getAllResidencies, getSingleResidencies} = require("../controllers/residencyController")

residencyRoute.post('/register', jwtCheck, createResidency)
residencyRoute.get('/list', getAllResidencies)
residencyRoute.get('/:id', getSingleResidencies)

module.exports = residencyRoute