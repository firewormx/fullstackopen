import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container

    const blog ={
        author: 'Nina',
        title: 'Today is Apr 17',
        url: 'http://www.testing.com',
        likes: 10
      }

    beforeEach(() => {
      container = render(
        <Blog blog={blog}/>
      ).container
    })

    test('render author and blog title', () => {
      
        const testAuthor = screen.findAllByText('Nina', {exact : false})
        const testTitle = screen.findAllByText('Today is Apr 17', {exact : false})
      
        expect(testAuthor).toBeDefined()
        expect(testTitle).toBeDefined()
      
      })

  test('at start the url and likes info are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, the url and likes info are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

    screen.debug()
  })

  test('the event handler is called twice when like button is clicked twice', async() => {
    const mockHandler = vi.fn()

    const togglableLikes = () => {
     toggleLikesOf(blog.id)
    }

    render(<Blog toggleLikes={mockHandler(togglableLikes)} blog={blog}/>)

    const user = userEvent.setup()
    const button = container.querySelector('#like')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)

    await user.click(button)
    render(<Blog toggleLikes={mockHandler(togglableLikes)} blog={blog}/>)
    expect(mockHandler.mock.calls).toHaveLength(2)
    console.log(mockHandler.mock.calls)
  })
})

