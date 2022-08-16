const { iteratee } = require("lodash")
const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }  

  return blogs.length === 0
  ? 0
  : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (cMax, blog) => {

    max = cMax.likes > blog.likes 
    ? { "title" : cMax.title, "author" : cMax.author, "likes" : cMax.likes }
    : { "title" : blog.title, "author" : blog.author, "likes" : blog.likes }

    return max

  }

  return blogs.length === 0
  ? {}
  : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  const mostBlogged = lodash
  .chain(blogs)
    .groupBy('author')
    .sortBy('length')
    .value()
    .at(-1)


  return blogs.length === 0
  ? {}
  : { author: mostBlogged[0].author, blogs: mostBlogged.length }
}

const mostLikes = (blogs) => {
  const mostLiked = lodash
    .chain(blogs)
    .groupBy('author')
    .map((blogs, author) => {
      let likes = 0
      lodash.forEach(blogs, (blog) => {
        likes += blog['likes']
      })
      return { author: author, likes: likes }
    }).orderBy('likes', 'desc').first().value()
    return mostLiked ? mostLiked : {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}