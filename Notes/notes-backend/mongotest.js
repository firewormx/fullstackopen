const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstackopen:${password}@cluster0.i1viykx.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url).then(()=>{
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })
  
  const Note = mongoose.model('Note', noteSchema)
  
  // const note = new Note(
  //  {
  //   content: 'MongoDB database is awsome!!',
  //   important: true
  // }
  // )

// note.save().then(result => {
//   console.log('note saved!')
//   // the event handler closes the database connection with below code
//   mongoose.connection.close();
//   // for debugging 
//   console.log(note);
// })

  // find all documents in the model. In this case, get all of the notes stored in the notes collection.
Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
})