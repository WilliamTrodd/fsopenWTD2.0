import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls event handler', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const blogTitleIn = screen.getByPlaceholderText('Blog Title')
  const blogAuthIn = screen.getByPlaceholderText('Blog Author')
  const blogUrlIn = screen.getByPlaceholderText('Blog Url')
  const submitButton = screen.getByText('create')

  await user.type(blogTitleIn, 'testing a form...')
  await user.type(blogAuthIn, 'Test Auth')
  await user.type(blogUrlIn, 'test.com')

  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Auth')
  expect(createBlog.mock.calls[0][0].url).toBe('test.com')


})