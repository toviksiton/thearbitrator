import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Only initialize if env vars are present (graceful degradation)
function createRatelimiter(requests: number, windowSeconds: number) {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, `${windowSeconds} s`),
    analytics: true,
  })
}

// AI routes: 10 requests per minute per user
export const aiRatelimit = createRatelimiter(10, 60)

// Auth routes: 5 requests per minute per IP
export const authRatelimit = createRatelimiter(5, 60)

export async function checkRateLimit(
  limiter: ReturnType<typeof createRatelimiter>,
  identifier: string
): Promise<{ success: boolean; remaining: number; reset: number }> {
  if (!limiter) {
    // No Redis configured — allow all requests in development
    return { success: true, remaining: 99, reset: 0 }
  }

  const result = await limiter.limit(identifier)
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  }
}
