import type UserService from "../services/user.service";
import { BadRequestResponse, InternalServerErrorResponse, NotFoundResponse, SuccessResponse } from "../utils/responses";

export default class UserController {
  private userService: UserService;

  constructor(_userService: UserService) {
    this.userService = _userService;
  }

  signUpUser = async (req: any, res: any) => {
    try {
      const userData = req.body;
      if (!userData.email || !userData.password || !userData.first_name || !userData.last_name) {
        return BadRequestResponse.send(res, "All fields are required");
      }

      const user = await this.userService.signUpUser(userData);
      return SuccessResponse.send(res, {}, "User created successfully");
    } catch (error: any) {
      return InternalServerErrorResponse.send(res, error.message);
    }
  };

  signInUser = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return BadRequestResponse.send(res, "Email and password are required");
      }
      const user = await this.userService.signInUser(email, password);
      if (!user) {
        return NotFoundResponse.send(res, "User not found or invalid credentials");
      }
      return SuccessResponse.send(res, user, "User signed in successfully");
    } catch (error: any) {
      return InternalServerErrorResponse.send(res, error.message);
    }
  };
}