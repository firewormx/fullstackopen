const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith, createBlog} = require('./helper')
const { create } = require('domain')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await request.post('/api/users',{
        data: {
            name: "Summy Wong",
            username: "Summer",
            password: "Summer"
    }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Login').first()
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', {name: 'login'})).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async({page}) => {
    await loginWith(page, 'Summer', 'Summer')
    await expect(page.getByText('Summy Wong logged in successfully!')).toBeVisible()
    })

    test('fails with wrong password', async({page}) => {
      await loginWith(page, 'Summer', 'wrong')
      const errorDiv = await page.getByTestId('error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Summy Wong logged in successfully!')).not.toBeVisible()
        })
  })

  describe('When logged in', () => {
    beforeEach(async({page})=>{
   await loginWith(page, 'Summer', 'Summer')
   await expect(page.getByText('Summy Wong logged in successfully')).toBeVisible()
    })

    test('a new blog can be created', async({page}) => {
      await createBlog(page, 'test blog by playwright!', 'Summy', 'http://www.playwright.com', true)
      await page.getByRole('button', {name: 'view'}).click()
      await expect(page.getByTestId('title')).toBeVisible()
      await expect(page.getByTestId('author')).toBeVisible()
      await expect(page.getByRole('link'),{name: 'http://www.playwright.com'}).toBeVisible()
     })

     test('blog can be edited', async({page}) => {
      await createBlog(page, 'test editing like by playwright', 'Kammy', 'http://kammy.fin.co', true)
      await page.getByRole('button', {name: 'view'}).click()
      await expect(page.getByText('0')).toBeVisible()
      await page.getByRole('button', {name: 'like'}).click()
      await expect(page.getByText('1')).toBeVisible()
     })

     test('user who added the blog can delete the blog', async ({ page }) => {
      await createBlog(page, 'titlesth', 'Summy Wong', 'summyann.com', true)
      await page.reload()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByTestId('title')).toBeVisible()
      await expect(page.getByTestId('author')).toBeVisible()
      await expect(page.getByRole('link', { name: 'summyann.com' })).toBeVisible()
  
      await page.getByRole('button', { name: 'remove' }).click()
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('Remove blog titlesth by Summy Wong?')
        await dialog.accept()
        await expect(page.getByText('Blog successfully removed')).toBeVisible()
      })
    })
  
  })
  
  test('Only the creator can see remove button', async({ page, request }) => {
    await request.post('/api/users', {
      data:{
        name: "Summer",
        username: "Summer",
        password: "Summer"
      }
    })

    await request.post('/api/users', {
      data:{
        name:"Winter",
        username: "Winter",
        password:'Winter'
      }
    })
    
    await loginWith(page, 'Summer', 'Summer')
    await createBlog(page, 'test only author can see remove button', 'Summy Wong', 'Summer.com', true)
    await expect(page.getByRole('button', {name: 'remove'})).toBeVisible()
    await page.getByRole('button', {name: 'logout'}).click()

    await loginWith(page, 'Winter', 'Winter')
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
  })
  
  test('Blogs are arranged in the order according to likes', async({page}) => {
await loginWith(page, 'Summer', 'Summer')
await createBlog(page, 'test blog order one', 'Summer', 'Summer.com_1', true)
await createBlog(page, 'test blog order two', 'Summer', 'Summer.com_2', true)
await createBlog(page, 'test blog order three', 'Summer', 'Summer.com_3', true)

await page.locator('div').filter({ hasText: /^test blog order three/}).locator('#view-button').click()
await page.getByTestId('like').nth(2).click()
await page.reload()

await page.getByRole('button', {name: 'view'}).first().click()
await expect(page.getByText('1like')).toBeVisible()


  })
})