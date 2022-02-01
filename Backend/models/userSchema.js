const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    phone: { type: Number },
    gender: { type: String },
    imagePath: { type: String },
    Address: [
        {
            Address_id: { type: Number },
            address: { type: String },
            pincode: { type: Number },
            city: { type: String },
            states: { type: String },
            country: { type: String }
        }
    ],
})

module.exports = mongoose.model('Users', userSchema)