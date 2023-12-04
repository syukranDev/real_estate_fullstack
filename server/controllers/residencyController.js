const asyncHandler = require('express-async-handler')
const prisma = require('../config/prismaConfig')

const createResidency = asyncHandler(async(req, res) => {
    let { title, description, price, address, city,country, image, facilities, userEmail } = req.body
    console.log({ data: req.body})
    try {
        const residency = await prisma.residency.create({ 
            data: { 
                title, 
                description, 
                price, 
                address, 
                country, 
                city,
                facilities, 
                image, 
                owner: {connect : {email: userEmail}}
            }
        })
        
        return res.send ({
            message: "Residency created successfully",
            residency
        })

    } catch(err) {
        if (err.code === 'P2002') throw new Error('A residency with address already exist')

        throw new Error(err.message)
    }
})

const getAllResidencies = asyncHandler(async(req, res) => {
    let residency;

    try{
        residency = await prisma.residency.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    } catch(err){
        throw new Error(err.message)
    }
    return res.send(residency)
})

const getSingleResidencies = asyncHandler(async(req, res) => {
    const id = req.params.id
    let residency;

    try{
        residency = await prisma.residency.findUnique({
            where: {id}
        })
    } catch(err){
        throw new Error(err.message)
    }

    return res.send(residency)

})


module.exports = { 
    createResidency, 
    getAllResidencies,
    getSingleResidencies
}


