import faker from "faker";

export type FakeUserData = ReturnType<typeof generateFakeUserData>;

export const generateFakeUserData = () => ({
  email: {
    correct: `success+${faker.datatype.number(999999)}@simulator.amazonses.com`,
    withoutAtSign: faker.lorem.words(1),
    withoutDomain: `${faker.lorem.words(1)}@`,
  },
  password: {
    correct: "Password1234",
    tooShort: faker.internet.password(9, false, /^[A-Za-z]*$/, "8Aa"),
    tooLong: faker.internet.password(81, false, /^[A-Za-z]*$/, "8Aa"),
    onlyLowerCaseLetters: faker.internet.password(10, false, /^[a-z]*$/),
    onlyUpperCaseLetters: faker.internet.password(10, false, /^[A-Z]*$/),
    withoutDigits: faker.internet.password(10, false, /^[A-Za-z]*$/),
  },
});
