const mongoose = require('mongoose');

/**
 * MongoDB Database Connection
 * MongoDB එක සමඟ connect වෙනවා
 */
const connectDB = async () => {
  try {
    // MongoDB එකට connect වෙන්න try කරනවා
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // මේ options වලින් warnings වළක්වනවා
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
  } catch (error) {
    // Error එකක් ආවොත් මේක run වෙනවා
    console.error('❌ MongoDB Connection Error:', error.message);

    // Server එක stop කරනවා error එකක් ආවොත්
    process.exit(1);
  }
};

module.exports = connectDB;
