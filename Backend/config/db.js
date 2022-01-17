const mongoose=require('mongoose')

const db = "mongodb://localhost:27017/neoStore";
 async function connectDB() {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("Mongoose connected")
    }
    catch (err) {
        console.log(err.message)
    }
}
module.exports=connectDB;