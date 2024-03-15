import { type Prisma } from '@prisma/client';

export const cityState: Prisma.CityStateCreateInput[] = [
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
