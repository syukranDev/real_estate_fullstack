const asyncHandler = require('express-async-handler')
const prisma = require('../config/prismaConfig')

const createUser = asyncHandler(async(req, res) => {
    console.log('Creating a new user')

    let { email } = req.body

    const isUserExists = await prisma.user.findUnique({where: { email }})
    if(!isUserExists){
        const user = await prisma.user.create({data: req.body})
        return res.send({
            message: 'User registered successfully.',
            user: user,
        })
    } else return res.status(201).json({ message: "User already registered"})

})

const bookVisit = asyncHandler(async(req, res) => {
    const {email, date} =  req.body
    const {id} = req.params

    try{
        const isUserAlreadyBooked = await prisma.user.findUnique({
            where: { email},
            select : {bookedVisits: true} //this is attribbute SELECT
        })

        if (isUserAlreadyBooked.bookedVisits.some(visit => visit.id === id)) {
            res.status(400).json({ message: 'This residency is already booked by you.'})
        } else {
            await prisma.user.update({
                where: {email},
                data: {
                    bookedVisits: {push: {id, date}}
                }
            })
            return res.send("Your visit is booked successfully.")
        }
    } catch(err) {
        throw new Error(err.message)
    }
})

const getAllBookings = asyncHandler(async(req, res) => {
    const { email } = req.body
    let existingBooking;
    try {
        existingBooking = await prisma.user.findUnique({
            where: {email},
            select: { bookedVisits :true}
        })
    } catch(err) {
        throw new Error(err.message)
    }
    return res.send(existingBooking)
})

const cancelBooking = asyncHandler(async(req, res) => {
    const { email } = req.body
    const {id} = req.params

    try {
        existingBooking = await prisma.user.findUnique({
            where: {email},
            select: { bookedVisits :true}
        })

        const index = existingBooking.bookedVisits.findIndex(visit => visit.id === id)

        if (index === -1) {
            res.status(404).json({ message: 'Booking not found'})
        } else {
            existingBooking.bookedVisits.splice(index, 1)

            await prisma.user.update({
                where: {email},
                data: {
                    bookedVisits: existingBooking.bookedVisits //updated bookedVisits array after splice.
                }
            })

            res.send("Booking cancelled successfully")
        }
    } catch(err) {
        throw new Error(err.message)
    }
})

const favouriteBooking = asyncHandler(async(req, res) => {
    const {email} = req.body
    const {rid} = req.params

    if (!rid) return res.status(422).send({errMsg: 'Missing rid params.'})

    try {
        user = await prisma.user.findUnique({
            where: {email}
        })

        //Update to remove id from favourite list
        if(user.favResidenciesID.includes(rid)) {
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            })
            res.send({message: "Remove from favourite", user: updateUser})
        } 
        //Update to add id to favourite list
        else {
            const updateUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesID : {
                        push: rid
                    }
                }
            })
            res.send({message: "Add into favourite", user: updateUser})
        }

    } catch(err) {
        throw new Error(err.message)
    }
})

const getAllFavourites = asyncHandler(async(req, res) => {
    const {email} = req.body
    try{
        const favResd = await prisma.user.findUnique({
            where: {email},
            select: { favResidenciesID: true}
        })

        return res.send(favResd)
    } catch(err) {
        throw new Error(err.message)
    }

})



module.exports = {
    createUser,
    bookVisit,
    getAllBookings,
    cancelBooking, 
    favouriteBooking,
    getAllFavourites
}

