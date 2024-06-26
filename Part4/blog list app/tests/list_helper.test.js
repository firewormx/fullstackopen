/* eslint-disable quotes */
const { test, describe } = require('node:test')
const assert = require('node:assert')// assert.strictEqual/deepStrictEqual(actual, expected[,message])
const listHelper = require('../utils/list_helper')

const dummy = listHelper.dummy
const totalLikes = listHelper.totalLikes
const favoriteBlog = listHelper.favoriteBlog
const mostBlogs = listHelper.mostBlogs
const mostLikes = listHelper.mostLikes

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

const listOneBlog = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
    }
]

describe('Dummy function', () => {
    test('dummy returns one', () => {
        const blogs = []
        const result = dummy(blogs)

        assert.strictEqual(result, 1)
    })
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const emptyblog = []
        assert.strictEqual(totalLikes(emptyblog), 0)
    })
    test('when list has only one blog equals the likes of that', () => {
        assert.strictEqual(totalLikes(listOneBlog), 5)
    })
    test('of a bigger list is calculated right', () => {
        assert.strictEqual(totalLikes(blogs), 36)
    })
})

describe('Favorite blog', () => {
    test('of empty list is undefined', () => {
        assert.strictEqual(favoriteBlog([]), undefined)
    })

    test('when list only has one blog is that blog', () => {
        assert.strictEqual(favoriteBlog(listOneBlog), listOneBlog[0])
    })

    test('of a bigger list is the most liked blog"', () => {
        assert.deepStrictEqual(favoriteBlog(blogs), {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        })
    })
})

describe('Author with most blogs', () => {

    test('of empty list is undefined', () => {
        assert.strictEqual(mostBlogs([]), undefined)
    })

    test('when list has only one blog is the author itself', () => {
        assert.deepStrictEqual(mostBlogs(listOneBlog), {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('of a bigger list is the most productive author', () => {
        assert.deepStrictEqual(mostBlogs(blogs),{
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('the author with the most likes', () => {
    test('of empty list is undefined', () => {
        assert.strictEqual(mostLikes([]), undefined)
    })

    test('when the list has only one blog is its number of likes', () => {
        assert.deepStrictEqual(mostLikes(listOneBlog), {
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of a bigger list is the most liked author', () => {
        assert.deepStrictEqual(mostLikes(blogs), {
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})