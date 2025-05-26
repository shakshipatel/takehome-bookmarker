import type { PrismaClient } from "../generated/prisma";

export default class UserDao {
  private _prisma: PrismaClient;
  
  constructor(_prisma: PrismaClient) {
    this._prisma = _prisma;
  }

  createUser = async (userData: {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
  }) => {
    try {
      const user = await this._prisma.user.create({
        data: userData,
      });
      return user;
    } catch (error: any) {
      throw new Error(`Error creating user: ${error?.message}`);
    }
  }

  getUserByEmail = async (email: string) => {
    try {
      const user = await this._prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error: any) {
      throw new Error(`Error fetching user by email: ${error?.message}`);
    }
  }

  getUserById = async (id: string) => {
    try {
      const user = await this._prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error: any) {
      throw new Error(`Error fetching user by ID: ${error?.message}`);
    }
  }
}