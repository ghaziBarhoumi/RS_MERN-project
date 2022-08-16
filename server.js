const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')

//const checkUser = require('./middleware/auth.middleware')

require ('dotenv').config({path: './config/.env'})
require('./config/db')


const app = express()



//Miselware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

//jws
//app.get('*', checkUser)

//Routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// Server
app.listen(process.env.PORT, ()=> {
    console.log(`server started at ${process.env.PORT}`);
})