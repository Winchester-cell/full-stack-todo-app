import mongoose from "mongoose";

const schema = mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                },
                isDone: {
                    type: Boolean,
                    default: false,
                }
            }
        ],
        default: []
    },
}, { timestamps: true })

const todoModel = mongoose.models.Todo || mongoose.model('Todo', schema)

export default todoModel