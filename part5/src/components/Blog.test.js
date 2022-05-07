import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> :', () => {
  const user = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    id: '62468b6f9ce259bc251fbad5',
  }

  const blog = {
    url: 'https://overreacted.io/on-let-vs-const/',
    title: 'On let vs const',
    author: 'Dan Abramov',
    likes: 5,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      id: '62468b6f9ce259bc251fbad5',
    },
  }

  // eslint-disable-next-line quotes
  test("displays only blog's title and author on rendering", async () => {
    render(<Blog blog={blog} />)

    const title = screen.getByText(/On let vs const/i)
    const author = screen.getByText(/Dan Abramov/i)
    const url = screen.queryByText('https://overreacted.io/on-let-vs-const/')
    const likes = screen.queryByText(/5/i)

    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('display url and number of likes when "view" button is clicked', async () => {
    render(<Blog blog={blog} user={user} />)

    const testUser = userEvent.setup()
    const showDetailsButton = screen.getByRole('button', { name: /view/i })
    await testUser.click(showDetailsButton)

    const url = screen.getByText('https://overreacted.io/on-let-vs-const/')
    const likes = screen.getByText(/5/i)

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('clicking like button twice calls the click handler twice', async () => {
    const randomClick = () => {
      let time = Math.floor(Math.random() * 5000)

      const clickButtonAfterTime = (resolve) =>
        setTimeout(async () => {
          await testUser.click(likeButton)
          resolve()
        }, time)

      return new Promise((resolve) => clickButtonAfterTime(resolve))
    }
    const updateLikes = jest.fn()
    render(<Blog blog={blog} user={user} updateLikes={updateLikes} />)

    const testUser = userEvent.setup()
    const showDetailsButton = screen.getByRole('button', { name: /view/i })
    await testUser.click(showDetailsButton)

    const likeButton = screen.getByRole('button', { name: /like/i })
    await testUser.click(likeButton)
    /*
    A user won't necessarily double click.
    Therefore, simulating a user click within 0-5 seconds of the first click
    */
    await randomClick()

    expect(updateLikes.mock.calls).toHaveLength(2)
  })
})
