import { ValidCreateUserBody } from "../../router/user/createUser";
import { faker } from "@faker-js/faker";

export function createFakeUser({
  username,
  email,
  password,
}: Partial<ValidCreateUserBody> = {}): ValidCreateUserBody {
  return {
    username: username ?? faker.internet.userName(),
    email: email ?? faker.internet.email(),
    password: password ?? faker.internet.password(),
  };
}
