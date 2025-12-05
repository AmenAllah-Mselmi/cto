import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// Ensure Prisma uses the binary engine by default in this environment
if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary'
}

let _client: any
try {
  _client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // @ts-ignore - runtime option may be present in some Prisma versions
    engine: { type: 'binary' },
  })
} catch (err) {
  // If Prisma client constructor fails (for example when engine 'client' requires adapter),
  // fall back to a stub that won't crash imports during Next build.
  // Handlers that actually call the DB will receive a clear error at runtime instead.
  // eslint-disable-next-line no-console
  console.warn('PrismaClient constructor failed; using stub client for build-time:', err && (err as Error).message)

  const handler: ProxyHandler<any> = {
    get() {
      return async () => {
        throw new Error('Prisma client unavailable in this environment. See server logs for details.')
      }
    },
  }

  _client = new Proxy({}, handler)
}

export const prisma = globalForPrisma.prisma ?? _client

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma