const loginWith = async( page, username, password ) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', {name: 'login'}).click()
}

const createBlog = async(page, title, author, url) => {
    await page.locator('.createNew').click()
      await page.locator('.title').fill(title)
      await page.locator('.author').fill(author)
      await page.locator('.url').fill(url)
      await page.getByRole('button', {name: 'create'}).click()

}
export { loginWith, createBlog }