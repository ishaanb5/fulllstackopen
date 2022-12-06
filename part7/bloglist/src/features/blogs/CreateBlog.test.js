import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />:', () => {
  test('calls pros.CreateNewBlog() with the correct details on creating a new blog', async () => {
    const createNewBlog = jest.fn()
    render(<CreateBlog createNewBlog={createNewBlog} />)

    const user = userEvent.setup()
    const title = screen.getByRole('textbox', { name: /title/i })
    const url = screen.getByRole('textbox', { name: /url/i })
    const author = screen.getByRole('textbox', { name: /author/i })
    const createButton = screen.getByRole('button', { name: /create/i })

    await user.type(title, 'Java Ternary Operator examples')
    await user.type(
      url,
      'https://mkyong.com/java/java-ternary-operator-examples/'
    )
    await user.type(author, 'mykong')
    await user.click(createButton)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0]).toEqual({
      title: 'Java Ternary Operator examples',
      author: 'mykong',
      url: 'https://mkyong.com/java/java-ternary-operator-examples/',
    })
  })
})
