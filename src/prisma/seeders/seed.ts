import { PrismaClient } from '@prisma/client';
import { countries } from './countries';
import { brazilStates } from './brazilStates';
import { cities } from './cities';
import { cityState } from './cityState';
import { users } from './users';

const prisma = new PrismaClient();

async function main (): Promise<void> {
  for (const country of countries) {
    await prisma.country.create({ data: country });
  }

  for (const state of brazilStates) {
    await prisma.state.create({ data: state });
  }

  for (const city of cities) {
    await prisma.city.create({ data: city });
  }

  for (const cityStateItem of cityState) {
    await prisma.cityState.create({ data: cityStateItem });
  }

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

main()
  .then(() => {
    console.log('Database seeded');
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
