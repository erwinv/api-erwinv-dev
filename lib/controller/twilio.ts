import { type Middleware } from 'koa'
import config from '../config.js'
import twilioClient from '../service/twilio.js'
import twilio = require('twilio')

interface GetTwilioVideoTokenParams {
  meetingId: string
}
interface GetTwilioVideoTokenResult {
  token: string
}

export function getVideoToken(): Middleware {
  return async (ctx) => {
    const { meetingId } = ctx.request.body as GetTwilioVideoTokenParams

    const { uid } = ctx.state.user

    // const room =
    await twilioClient.video.v1.rooms
      .get(meetingId)
      .fetch()
      .catch(() => {
        return twilioClient.video.v1.rooms.create({
          uniqueName: meetingId,
          type: 'go',
        })
      })

    const token = new twilio.jwt.AccessToken(
      config.TWILIO_ACCOUNT_SID,
      config.TWILIO_API_KEY_SID,
      config.TWILIO_API_KEY_SECRET,
      {
        identity: uid,
        // nbf: 0,
        // exp: 0,
        ttl: 14400,
      }
    )
    token.addGrant(new twilio.jwt.AccessToken.VideoGrant({ room: meetingId }))

    ctx.body = { token: token.toJwt() } as GetTwilioVideoTokenResult
  }
}
