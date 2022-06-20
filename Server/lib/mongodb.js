const { connect } = require("mongoose");
const { MONGO_URI } = require("../utils/constants");

async function connectDB() {
  try {
    const conn = await connect("mongodb://localhost:27017/myLoginRegisterDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB DataBase : ${conn.connection.name}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
