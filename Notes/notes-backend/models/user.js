//define mongoose schema for users
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
        //this ensures the uniqueness of username (uniqueness index)
        //Mongoose validations do not detect the index violation, and instead of ValidationError they return an error of type MongoServerError.
    },
    name: String,
    passwordHash: String,//password hash is the output of a one-way hash function applied to the user's password.
    notes: [
        {    // the ids of notes are stroed within the user document as an array of Mongo ids.
            //The type of the field is ObjectId that references note-style documents
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
            //ref option helps Mongoose to understand the data is referenced from another collection 'Note'.
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()//transfrom _id obj to Str
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User