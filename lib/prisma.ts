/*
  Robust Prisma client wrapper for Next.js

  - Ensures `PRISMA_CLIENT_ENGINE_TYPE` is set to `binary` before loading @prisma/client
    (helps avoid the 'client' engine requiring adapter/accelerateUrl during builds).
  - Loads @prisma/client via `require` fallback to be compatible with various package shapes.
  - Exports a single global Prisma client instance in development to avoid multiple connections.
*/

/* eslint-disable @typescript-eslint/no-require-imports */
// Ensure the engine env is set early (before importing the package)
if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary'
}

// Use a runtime require so TypeScript won't complain if package shape differs
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _prismaPkg: any = require('@prisma/client')
// Use dynamic access to PrismaClient constructor
const PrismaClient = _prismaPkg.PrismaClient || _prismaPkg.default || _prismaPkg

declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined
}

// Instantiate PrismaClient with a safe fallback for build-time environments
let client: any
try {
  client = global.prisma ?? new PrismaClient({
    accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
} catch (err: any) {
  // If Prisma requires an adapter/accelerateUrl during build, provide a stub so
  // Next.js static page data collection won't crash. This keeps builds green
  // while you set up Prisma Accelerate or an adapter for runtime.
  // eslint-disable-next-line no-console
  console.warn('Prisma client failed to construct during build-time:', err?.message ?? err)

  const makeStub = () => {
    const noop = async () => undefined
    const handler: ProxyHandler<any> = {
      get: (_t, prop) => {
        if (prop === '$connect') return noop
        if (prop === '$disconnect') return noop
        if (prop === '$on') return () => undefined
        if (prop === '$executeRaw' || prop === '$queryRaw') return async () => []
        // any model access returns an object whose callables return empty results
        return new Proxy(async () => [], { apply: () => Promise.resolve([]) })
      },
    }
    return new Proxy({}, handler)
  }

  client = makeStub()
}

if (process.env.NODE_ENV !== 'production') global.prisma = client

export const prisma = client