import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main (): Promise<void> {
  await prisma.$executeRawUnsafe('DROP DATABASE IF EXISTS pet_app;');
}

main()
  .then(() => {
    console.log('Database dropped');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
