import * as bcryt from "bcrypt";
import User from "../models/user.js";

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
};

export default userService;
