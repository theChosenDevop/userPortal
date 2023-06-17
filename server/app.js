require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
//connect to database
const connectDB = require('./db/connectDB')

// routers
const userRouter = require('./routes/UserRoutes')
const authRouter = require('./routes/authRoutes')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use('/user_portal/users', userRouter)
app.use('/user_portal/auth',authRouter)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=> {`Server is listening on port ${port}`})
    } catch (error) {
        console.log(error)
    }
}

start()