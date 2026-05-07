require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const dbConnection = require('./app/config/dbcon')
const cors = require('cors')
const session=require('express-session')
const cookieParser=require('cookie-parser')


const app = express()
dbConnection()

app.set("view engine", 'ejs')
app.set('views', 'views')

app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRECT || 'hellonode',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
     }
  }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())


const route=require('./app/routes') 
app.use(route)

const BlogRoute = require('./app/routes/blogRoute')
app.use('/api', BlogRoute)

const userAuthRoute=require('./app/routes/userAuthRoute')
app.use('/api',userAuthRoute)

const PORT = 5005;
app.listen(PORT, () => {
    console.log(`Sever is running on the Port ${PORT}`);

})