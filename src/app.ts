import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.send('Hello Pets!');
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

export { app };
