require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

const app = express()
app.use(express.json())

app.use(express.static('./public/'))



// connecting to the database
mongoose.connect(process.env.URI).then(
    () => {
        app.listen( process.env.PORT, () => {
            console.log('listening to the port')  
        })
    }
)
.catch( (err) => {
    console.log(err)
})



app.use('/api/users/', userRoutes )
