import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return false
    } else {
      await mongoose.connect('mongodb://localhost:27017/TodoList')
      console.log('Connected to DataBase');
    }
  } catch (err) {
    console.log('Error =>', err);
  }
}

export default dbConnect

///////////////////////////////////////////////////////////////////////////////

// import mongoose from "mongoose";

// const dbConnect = async () => {
//   if (mongoose.connections[0].readyState) {
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ Connected to MongoDB Atlas");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//   }
// };

// export default dbConnect;
