const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')
const userRouter = require('./Routes/UserRoutes')
const propertyRouter = require('./Routes/PropertyRoutes')
const categoryRouter = require('./Routes/CategoryRoutes')
const bookingRouter = require('./Routes/bookingRoutes')
const app = express()

app.use(cors())
app.use(express.json())

app.use((request, response, next)=>{

    if(request.url==='/users/login' || request.url==='/users/registration' || request.url.startsWith('/image')) {

        next()
    } else {

        const token = request.headers.token

        if(token) {

            try {
                const payload = jwt.verify(token, config.secret)
                request.headers.id = payload.id
                next()
            } catch(error) {

                response.send(utils.createErrorResult("Invalid token"))
            }  
        } else {

            response.send(utils.createErrorResult("Token is missing"))
        }
    }
})

app.use('/users', userRouter)
app.use('/property', propertyRouter)
app.use('/category', categoryRouter)
app.use('/booking', bookingRouter)
app.listen(4000, '0.0.0.0', ()=>{

    console.log("Server start at port 4000")
})