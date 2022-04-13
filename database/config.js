const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);

    console.log("Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inizializar base de datos");
  }
};

module.exports = {
  dbConnection,
};
