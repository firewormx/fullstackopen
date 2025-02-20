/* eslint-disable no-trailing-spaces */
const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://hotarux:${password}@cluster0.9h8zsmg.mongodb.net/bloglist?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url).then(() => {
    const blogSchema = new mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number
    })
    const Blog = mongoose.model('Blog', blogSchema)
    
    // const blog = new Blog({
    //     title: 'China News',
    //     author: 'Lili Wang',
    //     url: 'http://newsChina.com',
    //     likes: 103
    // })

    // blog.save().then(() => {
    //     console.log('blog saved!', `${blog}`)
    //     mongoose.connection.close()
    // })

    Blog.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })

})
