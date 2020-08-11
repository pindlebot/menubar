import mg from 'mailgun-js'
import { Context as LambdaContext, APIGatewayProxyEvent } from 'aws-lambda'

const apiKey = (process.env.MAILGUN_API_KEY as string)
const domain = (process.env.MAILGUN_DOMAIN as string)
const sender = (process.env.MAILGUN_SENDER as string)
const recipient = (process.env.MAILGUN_RECIPIENT as string)

const mailgun = mg({ apiKey, domain })

export async function handler (event: APIGatewayProxyEvent, context: LambdaContext, callback) {
  const eventData = JSON.parse(event.body as string)
  try {
    const body = await mailgun.messages().send({
      from: sender,
      to: recipient,
      subject: eventData.subject,
      text: eventData.message,
      'h:Reply-To': eventData.email
    })
    console.log(body)
  } catch (err) {
    return callback(err)
  }

  try {
    const body = await mailgun.messages().send({
      from: sender,
      to: eventData.email,
      subject: 'Thanks for reaching out!',
      text: `I'll get back to you as soon as I can. Here's a copy of the message you sent:\n\n${eventData.message}`,
      'h:Reply-To': recipient
    })
    console.log(body)
  } catch (err) {
    return callback(err)
  }
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({}),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    }
  })
}