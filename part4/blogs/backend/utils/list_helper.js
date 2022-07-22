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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}