//npx playwright test
//npx palywright test --ui
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async({page, request}) => {
    // post request to the /api/testing/reset empties the database
    await request.post('http:localhost:3004/api/testing/reset')
    //add a new user to backend from beforeEach block
    await request.post('http:localhost:3004/api/users', {
      data:{
        username: "test rainny",
           name : "rainny",
          password: "rainny",
      },
      // data2: {
      //   name: 'sunshine',
      //   username:'test sunshine',
      //   password:'haha'
      // }
    })
    await page.goto('http://localhost:5173')
  })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
      })

    test('login form can be opened', async({page})=> {
       await page.getByRole('button', {name: 'login'}).click()

    // const textboxes = await page.getByRole('textbox').all()
    // await textboxes[0].fill('test sunshine')
    // await textboxes[1].fill('haha')

      //  await page.getByRole('textbox').first().fill('test sunshine')
      //  await page.getByRole('textbox').last().fill('haha')

      await page.getByTestId('username').fill('test rainny')
      await page.getByTestId('password').fill('rainny')
      await page.getByRole('button', {name: 'login'}).click()
      await expect(page.getByText('rainny logged in')).toBeVisible()
    })

    describe('when logged in', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('test rainny')
        await page.getByTestId('password').fill('rainny')
        await page.getByRole('button', { name: 'login' }).click()
      })
  
      test('a new note can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new note' }).click()
        await page.getByTestId('newnote').fill('a note created by playwright6')
        await page.getByRole('button', { name: 'save' }).click()
        await expect(page.getByText('a note created by playwright6')).toBeVisible()
      })
    })  

    describe('and a note exsits', () => {
      beforeEach(async({page}) => {
      await page.getByRole('button', {name: 'new note'}).click()
      await page.getByRole('textbox').fill('another note by playwright7')
      await page.getByRole('button', {name: 'save'}).click()
      })

      test('importance can be changed', async({page}) => {
        await page.getByRole('button', {name: 'make not important'}).click()
        await expect(page.getByText('make important')).toBeVisible()
      })
    })

    test('login fails with wrong password', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByTestId('username').fill('test raninny')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
      // await expect(page.getByText('wrong credentials')).toBeVisible()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
  
      await expect(page.getByText('rainny logged in')).not.toBeVisible()
    })
  
})