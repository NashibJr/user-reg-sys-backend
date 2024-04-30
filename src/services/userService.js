import * as bcryt from "bcrypt";
import User from "../models/user.js";
import JWT from "jsonwebtoken";

const userService = {
  signupUser: async (userData) => {
    try {
      const exists = await User.findOne({ username: userData.username });

      if (exists) {
        return {
          message: "Username already taken, please use a different username",
        };
      }

      const hashedPassword = await bcryt.hash(userData.password, 10);
      let user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      user = user.toJSON();
      const { password, ...rest } = user;

      return {
        ...rest,
        message: "Account successfully created",
      };
    } catch (error) {
      return {
        message: "An error has occured",
        error: error?.message,
      };
    }
  },
  signinUser: async (userData, resp) => {
    try {
      let exists = await User.findOne({ username: userData.username });
      if (!exists) {
        return {
          message: "User with this username does not exist",
        };
      }

      const isPasswordCorrect = await bcryt.compare(
        userData.password,
        exists.password
      );
      if (!isPasswordCorrect) {
        return {
          message: "Your password is incorrect, please check and try again",
        };
      }

      const token = JWT.sign({ _id: exists._id }, process.env.JWT_SECRET, {
        expiresIn: "2days",
      });
      resp.cookie("token", token, { httpOnly: true });
      resp.cookie("isLoggedIn", true, { httpOnly: true });
      exists = exists.toJSON();
      const { password, ...rest } = exists;

      return {
        ...rest,
        token,
        message: "Successfully loggedin",
      };
    } catch (error) {
      return {
        message: "An error has occured",
        error: error?.message,
      };
    }
  },
  signoutUser: (resp) => {
    try {
      resp.clearCookie("token");
      resp.clearCookie("isLoggedIn");

      return {
        message: "Successfully loggedout",
      };
    } catch (error) {
      return {
        message: "An error has occured",
        error: error?.message,
      };
    }
  },
  loggedInUser: async (userId) => {
    try {
      let user = await User.findById(userId);
      user = user.toJSON();
      const { password, ...rest } = user;

      return rest;
    } catch (error) {
      return {
        message: "An error has occured",
        error: error?.message,
      };
    }
  },
};

export default userService;
