const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()// transform id of Schema, instaead of _id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Comment', commentSchema)
