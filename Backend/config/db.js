const mongoose = require('mongoose')

const db = process.env.DATABASE
async function connectDB() {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Mongoose connected")
    }
    catch (err) {
        console.log(err.message)
    }
}
module.exports = connectDB;