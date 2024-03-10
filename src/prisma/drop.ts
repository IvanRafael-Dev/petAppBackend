import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
const {
  DB_USER,
  DB_PASSWORD,
  DB_PORT
} = process.env;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `mysql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/mysql`
    }
  }
});

async function main (): Promise<void | null> {
  await prisma.$queryRawUnsafe('DROP DATABASE pet_app;');
}

main()
  .then(() => {
    console.log('Database dropped');
  })
  .catch((e) => {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.message);
      return;
    }
    console.error('Database does not exist');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
