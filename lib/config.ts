import { env } from 'node:process'

export default {
  PORT: Number(env.PORT ?? '8000'),
  FIREBASE_SERVICE_ACCOUNT_KEY: JSON.parse(
    env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
  ),
  TWILIO_API_KEY_SID: env.TWILIO_API_KEY_SID ?? '',
  TWILIO_API_KEY_SECRET: env.TWILIO_API_KEY_SECRET ?? '',
  TWILIO_ACCOUNT_SID: env.TWILIO_ACCOUNT_SID ?? '',
}
