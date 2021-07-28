const mongoose = require("mongoose");

const uri = process.env.DB_URI;

const initDBConnection = async () => {
  try{
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("DB connection successful");
  }
  catch(error){
    console.log("Error connecting to DB\nLogs - ");
    console.error(error);
  }
}

module.exports = { initDBConnection };