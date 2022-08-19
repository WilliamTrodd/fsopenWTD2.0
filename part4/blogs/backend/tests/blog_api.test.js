const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')


describe('blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const blogsAtStart = await helper.blogsInDb()

    const blogToCheck = blogsAtStart[0]

    expect(response.body).toContainEqual(blogToCheck)
  })

  test('blog id is defined', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('adding a valid blog', async () => {
    const newBlog = {
      title: 'POST Blog',
      author: 'W Trodd',
      url: 'testing.com',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain('POST Blog')
  })

  test('likes default to 0 if no value is given', async () => {
    const newBlog = {
      title: 'No Likes',
      author: 'W Trodd',
      url: 'testing.co.uk'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(r => ({ title: r.title, likes: r.likes }))
    expect(contents).toContainEqual({ title: 'No Likes', likes: 0 })
  })

  test('a blog with no content is not added', async () => {
    const newBlog = {
      likes:0,
      author:'NotAdded'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

  test('deletion of a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length-1
    )

    const contents = blogsAtEnd.map(r => r.id)
    expect(contents).not.toContain(blogToDelete.id)
  })

  test('updating a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]

    blogToEdit.likes = 8
    blogToEdit.title = 'Put Test'

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(blogToEdit)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)
    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).toContain('Put Test')

  })
})


describe('users', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('TESTPASS', 10)
    const user = new User({ username: 'root', passwordHash, name: 'Superuser' })

    await user.save()

  })
  test('adding a valid user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'TroddW',
      name: 'Will',
      password: 'NewPass123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length +1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('adding a user with an existing username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: usersAtStart[0].username,
      name: 'BobLoblaw',
      password: 'Test123!'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('adding a user with a password less than 3 chars', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'BlahBlah',
      name: 'BobLoblaw',
      password: 'ab'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('adding a user with a username less than 3 chars', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'BL',
      name: 'BobLoblaw',
      password: 'abc123!!'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })


})
afterAll(() => {
  mongoose.connection.close()
})