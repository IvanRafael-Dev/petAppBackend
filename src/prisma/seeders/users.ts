import { type Prisma } from '@prisma/client';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { brazilStates } from './brazilStates';
import { cities } from './cities';

export const users: Prisma.UserCreateInput[] = Array.from({ length: 10 }, (_, index) => {
  const passwordRaw = faker.internet.password({ length: 8, memorable: true });
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const username = faker.internet.userName({ firstName: firstname, lastName: lastname }).toLowerCase();
  const email = faker.internet.email({ firstName: firstname, lastName: lastname }).toLowerCase();
  const bio = faker.person.bio();
  const phone = faker.string.numeric({ length: 9, allowLeadingZeros: false });
  const street = faker.location.street();
  const number = faker.number.int({ min: 1, max: 999 });
  const zipCode = faker.location.zipCode();

  const user = {
    email,
    password: passwordRaw,
    profile: {
      create: {
        username,
        firstname,
        lastname,
        bio,
        phone,
        address: {
          create: {
            street,
            number,
            zipCode,
            state: { connect: { name: brazilStates[0].name } },
            city: { connect: { name: cities[index].name } }
          }
        }
      }
    }
  };
  console.log({ email: user.email, password: user.password });

  return user;
});
