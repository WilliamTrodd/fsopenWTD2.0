import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Component testing',
    author: 'TestAuth',
    url: 'hidden.com',
    likes: 555,
    user: '630337cbb0365aa91c071797',
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing', 'TestAuth'
  )
  expect(div).not.toHaveTextContent
  'likes', 'hidden.com'
})

test('renders all content when button clicked', async () => {
  const blog = {
    title: 'Component testing',
    author: 'TestAuth',
    url: 'hidden.com',
    likes: 555,
    user: '630337cbb0365aa91c071797',
  }

  //const mockHandler = jest.fn()

  const { container } = render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'hidden.com', '555'
  )
  //expect(mockHandler.mock.calls).toHaveLength(1)
})

test('checks if like button can be clicked twice', async () => {
  const blog = {
    title: 'Component testing',
    author: 'TestAuth',
    url: 'hidden.com',
    likes: 555,
    user: '630337cbb0365aa91c071797',
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} addLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})