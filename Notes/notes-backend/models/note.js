// only defines Mongoose schema for notes.
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,//build-in validators of mongoose
        required: true // build-in validators of mongoose
    },
    important: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
// function tranform(doc, ret, options){...} transform the resulting objs based on some criteria.
//doc means mongoose docs which is being converted.ret means the plain obj representation has been converted.
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Note', noteSchema)