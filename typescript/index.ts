// npm install --save-dev @types/express
// npm install --save-dev ts-node-dev (for recompilation on every change)
import express from 'express'
// const express = require('express')
const app = express()
//prefix unused params with underscore
app.get('/ping', (_req, res) => {
res.send('pong')
});

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})