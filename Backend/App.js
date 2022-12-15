const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8899;
const app = express()
const path = require('path')
const dotenv = require('dotenv')
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
// app.use(express.static(path.join(__dirname, "./public/")));
app.use(express.static(path.join(__dirname, "./build")));

const connectDB = require('./config/db')
connectDB()


const router = require('./routes/userRoutes')
app.use('/api/neostore', router)

const router3 = require('./routes/profileRoutes')
app.use('/api/neostore', router3)

const router1 = require('./routes/productRoutes')
app.use('/api/neostore', router1)

const router4 = require('./routes/categoryRoutes')
app.use('/api/neostore', router4)

const router5 = require('./routes/orderRoutes')
app.use('/api/neostore', router5)

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})

app.listen(port, (err) => {
    if (err) throw err
    console.log(`Work on ${port}`)
})

