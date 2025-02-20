const _ =require('lodash')

const dummy = (blogs) => {
    if(blogs) return 1
}

const totalLikes = (blogs) => {

    const likesArray = blogs.map(blog => blog.likes)
    const sum = likesArray.reduce((sum, current) => sum + current ,0)

    return blogs.length === 0 ? 0 : sum
}

// const favoriteBlog = (blogs) => {

//     if(blogs.length === 0) return undefined

//     const likesArray= blogs.map(blog => blog.likes)
//     const largestIndex = likesArray.indexOf(Math.max(...likesArray))
//     const largestinfo= blogs[largestIndex]

//     return {
//         title: largestinfo.title,
//         author: largestinfo.author,
//         likes:  largestinfo.likes
//     }
// }
const favoriteBlog = blogs => {
    if (blogs.length === 0) return undefined

    const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)
    return blogsSortedByLikes[0]
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return undefined
    //_.groupBy(collection, [iteratee=_.identity])
    const groupedBlogs =_.groupBy(blogs, 'author')
    //_.mapValues(object, [iteratee=_.identity]). the 2nd params is the func invoked per iteration.
    const blogsAuthor =_.mapValues(groupedBlogs, 'length')

    const toArrayAuthor = Object.entries(blogsAuthor)
    const mayorPair = toArrayAuthor.reduce((a,b) => (a[1] > b[1] ? a : b))
    return {
        author: mayorPair[0],
        blogs: mayorPair[1]
    }
}

const mostLikes = blogs => {
    if(blogs.length === 0) return undefined

    const likes = blogs => {
        return blogs.reduce((sum, blog) => sum + blog.likes, 0)
    }
    const blogsAuthors =_.groupBy(blogs, 'author')
    const blogLikes = _.mapValues(blogsAuthors, likes)
    const  arrayLikes = Object.entries(blogLikes)
    const mayorPair = arrayLikes.reduce((a, b) => a[1] > b[1] ? a : b)
    return { author: mayorPair[0],
        likes: mayorPair[1] }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}