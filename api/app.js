const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')

dotenv.config();

app.listen(8800, () => {
    console.log('backend is started');
})

mongoose.connect(process.env.MONGO_URL, {


}).then(() => {console.log('db connection started')})
    .catch((error) => console.log(error))

//MIDDLEWARE
app.use(express.json());

//ROUTE
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
