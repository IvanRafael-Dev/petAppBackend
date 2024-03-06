import { PrismaClient, type Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const countries: Prisma.CountryCreateInput[] = [
  {
    name: 'Brazil'
  }
];

const brazilStates: Prisma.StateCreateInput[] = [
  {
    name: 'São Paulo',
    code: 'SP',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Rio de Janeiro',
    code: 'RJ',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Minas Gerais',
    code: 'MG',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Espírito Santo',
    code: 'ES',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Paraná',
    code: 'PR',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Santa Catarina',
    code: 'SC',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Rio Grande do Sul',
    code: 'RS',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Mato Grosso do Sul',
    code: 'MS',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Mato Grosso',
    code: 'MT',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Goiás',
    code: 'GO',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Distrito Federal',
    code: 'DF',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Tocantins',
    code: 'TO',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Rondônia',
    code: 'RO',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Acre',
    code: 'AC',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Amazonas',
    code: 'AM',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Roraima',
    code: 'RR',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Amapá',
    code: 'AP',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Pará',
    code: 'PA',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Maranhão',
    code: 'MA',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Piauí',
    code: 'PI',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Ceará',
    code: 'CE',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Rio Grande do Norte',
    code: 'RN',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Paraíba',
    code: 'PB',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Pernambuco',
    code: 'PE',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Alagoas',
    code: 'AL',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Sergipe',
    code: 'SE',
    country: { connect: { name: 'Brazil' } }
  },
  {
    name: 'Bahia',
    code: 'BA',
    country: { connect: { name: 'Brazil' } }
  }
];

const cities: Prisma.CityCreateInput[] = [
  {
    name: 'Santos'
  },
  {
    name: 'São Vicente'
  },
  {
    name: 'Praia Grande'
  },
  {
    name: 'Guarujá'
  },
  {
    name: 'Bertioga'
  },
  {
    name: 'Cubatão'
  },
  {
    name: 'Itanhaém'
  },
  {
    name: 'Mongaguá'
  },
  {
    name: 'Peruíbe'
  },
  {
    name: 'São Paulo'
  }
];

const cityState: Prisma.CityStateCreateInput[] = [
  {
    city: { connect: { name: 'Santos' } },
    state: { connect: { name: 'São Paulo' } }
  },
  {
    city: { connect: { name: 'São Vicente' } },
    state: { connect: { name: 'São Paulo' } }
  },
  {
    city: { connect: { name: 'Praia Grande' } },
    state: { connect: { name: 'São Paulo' } }
  },
  {
    city: { connect: { name: 'Guarujá' } },
    state: { connect: { name: 'São Paulo' } }
  },
  {
    city: { connect: { name: 'Bertioga' } },
    state: { connect: { name: 'São Paulo' } }
  },
  {
    city: { connect: { name: 'Cubatão' } },
    state: { connect: { name: 'São Paulo' } }
  },
  {
    city: { connect: { name: 'Itanhaém' } },
    state: { connect: { name: 'São Paulo' } }
  },
  {
    city: { connect: { name: 'Mongaguá' } },
    state: { connect: { name: 'São Paulo' } }
  },
  {
    city: { connect: { name: 'Peruíbe' } },
    state: { connect: { name: 'São Paulo' } }
  },
  {
    city: { connect: { name: 'São Paulo' } },
    state: { connect: { name: 'São Paulo' } }
  }
];

const users: Prisma.UserCreateInput[] = [
  {
    name: 'any_name',
    email: 'mail@mail.com',
    password: 'any_password',
    profile: {
      create: {
        bio: 'any_bio',
        phone: '5511999999999',
        address: {
          create: {
            street: 'any_street',
            number: '123',
            zipCode: '123456',
            state: { connect: { name: 'São Paulo' } },
            city: { connect: { name: 'Santos' } }
          }
        }
      }
    }
  }
];

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
