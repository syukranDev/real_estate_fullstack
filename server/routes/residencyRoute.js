const express = require('express')
const residencyRoute = express.Router()

const {createResidency, getAllResidencies, getSingleResidencies} = require("../controllers/residencyController")

residencyRoute.post('/register', createResidency)
residencyRoute.get('/list', getAllResidencies)
residencyRoute.get('/:id', getSingleResidencies)

module.exports = residencyRoute