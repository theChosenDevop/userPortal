require('dotenv').config()
const express = require('express')
const app = express()

//connect to database
const connectDB = require('./db/connectDB')

app.get('/',(req,res) => { res.send('Home Portal')})

const port = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=> {`app is listening on port ${port}`})
    } catch (error) {
        console.log(error)
    }
}

start()