import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.text()
  const body = JSON.parse(payload)

  // Create a new Svix instance with your secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Handle the webhook
  const { id } = evt.data
  const eventType = evt.type

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)

  // Handle different event types
  switch (eventType) {
    case 'user.created':
      console.log('User created:', evt.data)
      // Here you would typically save the user to your database
      // Example: await createUser(evt.data)
      break
    
    case 'user.updated':
      console.log('User updated:', evt.data)
      // Here you would typically update the user in your database
      // Example: await updateUser(evt.data)
      break
    
    case 'user.deleted':
      console.log('User deleted:', evt.data)
      // Here you would typically delete the user from your database
      // Example: await deleteUser(evt.data.id)
      break
    
    case 'session.created':
      console.log('Session created:', evt.data)
      // Handle session creation if needed
      break
    
    case 'session.ended':
      console.log('Session ended:', evt.data)
      // Handle session end if needed
      break
    
    default:
      console.log(`Unhandled webhook event type: ${eventType}`)
  }

  return new Response('', { status: 200 })
}
