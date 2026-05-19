import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json()

  try {
    await resend.emails.send({
      from:    'Portfolio <onboarding@resend.dev>',
      to:      'isaacndoka7@gmail.com',
      subject: `Portfolio: ${subject}`,
      text:    `From: ${name} (${email})\n\n${message}`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}