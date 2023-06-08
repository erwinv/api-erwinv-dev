import twilio = require('twilio')
import config from '../config.js'

export default twilio(config.TWILIO_API_KEY_SID, config.TWILIO_API_KEY_SECRET, {
  accountSid: config.TWILIO_ACCOUNT_SID,
})
