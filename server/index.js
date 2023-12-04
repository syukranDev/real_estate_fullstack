const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { residency } = require('./config/prismaConfig.js')
dotenv.config()

const userRoute = require('./routes/userRoute.js')
const residencyRoute = require('./routes/residencyRoute.js')


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

app.use('/api/user', userRoute)
app.use('/api/residency', residencyRoute)
