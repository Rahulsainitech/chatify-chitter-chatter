const mongooose = require("mongoose")

const conectionDb = async()=>{
try {
    const conn = await mongooose.connect(process.env.MONGO_URI)
    console.log(`mongodb connected ${conn.connection.host}`)
} catch (error) {
    console.log(error)
    process.exit()
}
}

module.exports = conectionDb