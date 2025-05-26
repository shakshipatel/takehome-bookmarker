import ENV_CONFIG from "../configs/env.config";
import type UserDao from "../dao/user.dao";
import type { User } from "../generated/prisma";
import JwtHelper from "../helpers/jwtHelper";
import logger from "../utils/logger";
import bcrypt from "bcryptjs";

export default class UserService {
  private userDao: UserDao;
  private jwtHelper: JwtHelper;

  constructor(_userDao: UserDao) {
    this.userDao = _userDao;
    this.jwtHelper = new JwtHelper();
  }

  signUpUser = async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    try {
      const existingUser = await this.userDao.getUserByEmail(userData.email);
      if (existingUser) {
        logger.error(`User with email ${userData.email} already exists.`);
        throw new Error("User already exists with this email.");
      }

      const hashedPassword = await this.hashPassword(userData.password);
      userData.password = hashedPassword;

      const user = await this.userDao.createUser(userData);
      logger.info(`User created successfully: ${user.email} ${user.id}`);
      return user;
    } catch (error: any) {
      logger.error(`Error signing up user: ${error.message}`, error);
      throw new Error(`Error signing up user: ${error?.message}`);
    }
  }

  getUserByEmail = async (email: string) => {
    try {
      const user = await this.userDao.getUserByEmail(email);
      if (!user) {
        logger.error(`No user found with email: ${email}`);
        return null;
      }
      return user;
    } catch (error: any) {
      logger.error(`Error fetching user by email: ${error.message}`, error);
      throw new Error(`Error fetching user by email: ${error?.message}`);
    }
  }

  signInUser = async (email: string, password: string) => {
    try {
      const user = await this.userDao.getUserByEmail(email);
      if (!user) {
        logger.error(`No user found with email: ${email}`);
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user?.password);
      if (!isPasswordValid) {
        logger.error(`Invalid password for user: ${email}`);
        return null;
      }

      const accessToken = this.jwtHelper.generateAccessToken({
        user_id: user.id,
        email: user.email
      }, ENV_CONFIG.JWT_ACCESS_TOKEN_EXPIRY)

      return {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        accessToken
      };
    } catch (error: any) {
      logger.error(`Error signing in user: ${error.message}`, error);
      throw new Error(`Error signing in user: ${error?.message}`);
    }
  }

  private hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
}