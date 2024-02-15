const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://phonebook:YHjZxmBCcxBDrcn1@cluster0.m5qb2s6.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

// const phonebook = new Phonebook({
//   name: 'Olifer',
//   number:  "1980-9342",
// })

// phonebook.save().then(result => {
//   console.log('new phone item saved!');
//   console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
//   mongoose.connection.close()
// })

Phonebook.find({}).then(result => {
    result.forEach(item => {
      console.log(`phonebook: ${item.name} ${item.number}`)
    })
    mongoose.connection.close()
  })