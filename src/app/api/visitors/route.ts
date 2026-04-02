import { kv } from '@vercel/kv'

export async function GET() {
  try {
    const count = (await kv.get<number>('visits')) ?? 0
    return Response.json({ count })
  } catch {
    return Response.json({ count: 0 })
  }
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url)
    const by = Math.max(1, parseInt(url.searchParams.get('by') ?? '1', 10))
    const count = await kv.incrby('visits', by)
    return Response.json({ count })
  } catch {
    return Response.json({ count: 0 })
  }
}
