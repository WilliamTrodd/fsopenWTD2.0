const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: body.comments
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!(user._id.toString() === blog.user.toString())){
    return response.status(401).json({ error: 'post not created by this user' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
/*
blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const oldBlog = await Blog.findById(request.params.id)

  if(!(user._id.toString() === oldBlog.user.toString())){
    return response.status(401).json({ error: 'post not created by this user' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.json(updatedBlog)

})
*/

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  console.log(request.token)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: blog.likes, comments: blog.comments }, { new:true })
  response.json(updatedBlog.toJSON())
})
module.exports = blogsRouter