import { kv } from '@vercel/kv'

export async function GET() {
  try {
    const count = (await kv.get<number>('visits')) ?? 0
    return Response.json({ count })
  } catch {
    return Response.json({ count: 0 })
  }
}

export async function POST() {
  try {
    const count = await kv.incr('visits')
    return Response.json({ count })
  } catch {
    return Response.json({ count: 0 })
  }
}
