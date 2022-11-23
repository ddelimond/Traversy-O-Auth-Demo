const mongoose = require('mongoose');


const connectToDb = async function connectToDb() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongoose Connected: ${connect.connection.host} `)

    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectToDb