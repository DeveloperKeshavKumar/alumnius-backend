const mongoose = require('mongoose');

exports.connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("DB connected successfully.");
      
   } catch (error) {
      console.log("Error while connecting to DB");
      process.exit(1);
   }
}