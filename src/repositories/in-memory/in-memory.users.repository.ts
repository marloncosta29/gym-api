import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../users.repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UserRepository {
  private users: User[] = [];

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user ? user : null;
  }
  async create(data: Prisma.UserCreateInput) {
    const newUser: User = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }
  async findByEmail(email: string) {
    const user = this.users.find((u) => u.email === email);
    return user ? user : null;
  }
}
