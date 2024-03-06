import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.send('Hello Pets!');
});

app.post('/address', async (req, res) => {
  const { street, number, state, city, zipCode, profileId } = req.body;

  try {
    const address = await prisma.address.create({
      data: {
        street,
        city,
        zipCode,
        number,
        state,
        profileId,
        profile: { connect: { id: profileId } }
      },
      select: {
        id: true,
        street: true,
        city: true,
        zipCode: true,
        number: true,
        state: true
      }
    });

    return res.status(201).json(address);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  } finally {
    await prisma.$disconnect();
  }
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      profile: {
        select: {
          id: true,
          bio: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
          address: {
            select: {
              id: true,
              street: true,
              city: true,
              zipCode: true,
              number: true,
              state: true
            }
          }
        }
      }
    }
  });
  return res.json(users);
});

app.post('/profiles', async (req, res) => {
  const { bio, userId, phone } = req.body;

  try {
    const profile = await prisma.profile.create({
      data: {
        bio,
        phone,
        userId
      },
      select: {
        id: true,
        bio: true,
        phone: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return res.status(201).json(profile);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  } finally {
    await prisma.$disconnect();
  }
});

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        profile: {
          create: {
            bio: 'any_bio',
            phone: 'any_phone'
          }
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  } finally {
    await prisma.$disconnect();
  }
});

process.on('SIGINT', async () => {
  console.log('\nSIGINT: Closing database connection');
  await prisma.$disconnect();
  console.log('Server is shutting down...');
  process.exit(0);
});

export { app };
