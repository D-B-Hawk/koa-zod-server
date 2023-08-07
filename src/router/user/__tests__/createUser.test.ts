import supertest from "supertest";
import { app } from "../../../app";
import { User } from "../../../types";
import { createFakeUser } from "../../../utils/fake/createFakeUser";

describe("router/user/createUser", () => {
  it("creates a new user", async () => {
    const fakeUser = createFakeUser();

    const { status, body } = await supertest(app.callback())
      .post("/user")
      .send(fakeUser);

    const { id, createdAt, updatedAt, password, ...rest }: User = body.data;

    expect(status).toEqual(201);
    expect(id).toBeDefined();
    expect(createdAt).toBeDefined();
    expect(updatedAt).toBeDefined();
    expect(password).not.toBeDefined();
    expect(rest).toMatchObject({
      username: fakeUser.username,
      email: fakeUser.email,
    });
  });
  it("will return error if attempting to create user with taken username", async () => {
    const fakeUser = createFakeUser();
    const secondFakeUser = createFakeUser({ username: fakeUser.username });

    const { status } = await supertest(app.callback())
      .post("/user")
      .send(fakeUser);

    const { status: secondAttemptStatus, body } = await supertest(
      app.callback()
    )
      .post("/user")
      .send(secondFakeUser);

    expect(status).toEqual(201);
    expect(secondAttemptStatus).toEqual(400);
    expect(body.errors).toContain("Username is taken");
  });
  it("will return error if attempting to create user with taken email", async () => {
    const fakeUser = createFakeUser();
    const secondFakeUser = createFakeUser({ email: fakeUser.email });

    const { status } = await supertest(app.callback())
      .post("/user")
      .send(fakeUser);

    const { status: secondAttemptStatus, body } = await supertest(
      app.callback()
    )
      .post("/user")
      .send(secondFakeUser);

    expect(status).toEqual(201);
    expect(secondAttemptStatus).toEqual(400);
    expect(body.errors).toContain("Email is taken");
  });
  it("will throw validation errors if passed improper request body", async () => {
    const { status, body } = await supertest(app.callback())
      .post("/user")
      .send();

    expect(status).toEqual(400);
    expect(body.errors).toContain("email field: Required");
    expect(body.errors).toContain("username field: Required");
    expect(body.errors).toContain("password field: Required");
  });
});
