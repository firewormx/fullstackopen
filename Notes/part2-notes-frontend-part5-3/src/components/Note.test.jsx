import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Does not work anymore :(',
    important: true
  }

  render(<Note note={note} />)
  // screen.debug()

  const element = screen.getByText(
    'Does not work anymore :(', { exact:false })
  //Or element = screen.findByText('Does not work anymore :('), findByText returns a promise!
  // queryByText() also returns the element but it does not cause an exception if it is not found.

  screen.debug(element)
  //The existence of an element is checked using Vitest's expect command.
  expect(element).toBeDefined()

  // const { container } = render(<Note note={note}/>)

  // const div = container.querySelector('.note')
  // expect(div).toHaveTextContent(
  //   'Component testing is done with react-testing-library'
  // )
})

test('clicking the button calls event handler once', async() => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  const mockHandler = vi.fn()

  render(
    <Note note={note} toggleImportance={mockHandler}/>
  )

  const user= userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})

test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})