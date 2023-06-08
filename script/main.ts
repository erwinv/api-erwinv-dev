import 'dotenv/config'

import app from '../lib/app.js'
import config from '../lib/config.js'

app().listen(config.PORT)
console.info(`Listening on port: ${config.PORT}`)
