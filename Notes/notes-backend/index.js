// index.js file only imports the actual application from app.js file and then starts the app.
const app = require('./app') // the actual Express application.
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
