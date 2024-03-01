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

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      Profile: {
        select: {
          id: true,
          bio: true,
          phone: true,
          createdAt: true,
          updatedAt: true
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
        password
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
