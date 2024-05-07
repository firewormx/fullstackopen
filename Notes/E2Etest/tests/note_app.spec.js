//npx playwright test
//npx playwright test --ui
// for debug : npx playwright test note_app.spec.js:66 --debug
const { test, describe, expect, beforeEach } = require('@playwright/test')
const {loginWith, createNote} = require('./helper')

describe('Note app', () => {
  beforeEach(async({page, request}) => {
    // post request to the /api/testing/reset empties the database
    //same as await request.post('http://localhost:5173')
    await request.post('/api/testing/reset')

    //add a new user to backend from beforeEach block
    await request.post('/api/users', {
      data:{
        username: "test rainny",
           name : "rainny",
          password: "rainny",
      }
      // data2: {
      //   name: 'sunshine',
      //   username:'test sunshine',
      //   password:'haha'
      // }
    })
    await page.goto('')//same as await page.goto('http://localhost:5173')
  })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
      })

    test('user can login with correct credentials', async({page})=> {
      await loginWith(page, 'test rainny', 'rainny')
      await expect(page.getByText('rainny logged in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
      await loginWith(page, 'test rainny', 'rainny')
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
  
      await expect(page.getByText('rainny logged in')).not.toBeVisible()
    })

    describe('when logged in', () => {
      beforeEach(async ({ page}) => {
      await loginWith(page, 'test rainny', 'rainny')
      })

      test('a new note can be created', async ({ page }) => {
        await createNote(page, 'a note created by playwright', true)
        await expect(page.getByText('a note created by playwright')).toBeVisible()
      })

      describe('and a note exsits', () => {
        beforeEach(async({page}) => {
          await createNote(page, 'first note', true)
          await createNote(page, 'second note', true)
          await createNote(page, 'third note', true)
        })
  
        test('importance can be changed', async({page}) => {
          await page.pause()
        const otherNoteText = await page.getByText('second note')
        const otherNoteElement = otherNoteText.locator('..')

        await otherNoteElement.getByRole('button', {name: 'make not important'}).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
        })
      })
    })
    })  

  



  
