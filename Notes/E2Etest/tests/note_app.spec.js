//npx playwright test
//npx palywright test --ui
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {

  beforeEach(async({page}) => {
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

      await page.getByTestId('username').fill('test sunshine')
      await page.getByTestId('password').fill('haha')
      await page.getByRole('button', {name: 'login'}).click()
      await expect(page.getByText('sunshine logged in')).toBeVisible()
    })

    describe('when logged in', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('test sunshine')
        await page.getByTestId('password').fill('haha')
        await page.getByRole('button', { name: 'login' }).click()
      })
  
      test('a new note can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new note' }).click()
        await page.getByRole('textbox').fill('a note created by playwright')
        await page.getByRole('button', { name: 'save' }).click()
        await expect(page.getByText('a note created by playwright')).toBeVisible()
      })
    })  

})