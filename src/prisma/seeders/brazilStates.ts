import { type Prisma } from '@prisma/client';

export const brazilStates: Prisma.StateCreateInput[] = [
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
