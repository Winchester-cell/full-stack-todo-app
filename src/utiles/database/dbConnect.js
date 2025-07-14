import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return false
        } else {
            // mongoose.connect('mongodb://localhost:27017/TodoList')
            // mongoose.connect('mongodb+srv://manilimm91:reza3663@cluster0.u2mhath.mongodb.net/TodoProject')
            mongoose.connect('mongodb+srv://manilimm91:reza3663@cluster0.u2mhath.mongodb.net/todoproject?retryWrites=true&w=majority&appName=Cluster0')
            console.log('Connected to DataBase');
        }
    } catch (err) {
        console.log('Error =>', err);
    }
}

export default dbConnect