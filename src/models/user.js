import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: null,
    }

}
    , {
        toJSON: { virtuals: true },  
        toObject: { virtuals: true },
    })

schema.virtual('todos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'userID'
})

const userModel = mongoose.models.User || mongoose.model('User', schema)

export default userModel