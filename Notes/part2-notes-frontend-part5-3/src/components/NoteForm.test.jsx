import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()
  //the most flexible way of finding element in tests is the method  querySelector of the container obj, returned by render().
  const { container } = render(<NoteForm createNote={createNote} />)

  //   const inputs = screen.getAllByRole('textbox')
  //   const input = screen.getByPlaceholderText('write note content here')
  const input = container.querySelector('#note-input')
  const sendButton = screen.getByText('save')

  //   await user.type(inputs[0], 'testing a form...')
  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')

  console.log(createNote.mock.calls)
})