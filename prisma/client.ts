// built mode

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// export default prisma;

// dev mode
// this is only to solve 'too many prisma client error' in dev mode, since nextjs uses a feature called fast-refresh which causes this issue.

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
