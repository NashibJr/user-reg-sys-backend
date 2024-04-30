import userService from "../services/userService.js";
import JWT from "jsonwebtoken";

const userController = {
  signupUser: async (req, resp, next) => {
    try {
      const { body } = req;
      const data = await userService.signupUser(body);

      return resp.status(201).json({
        data,
      });
    } catch (error) {
      return resp.status(500).json({
        message: "Internal server error",
        error: error?.message,
      });
    }
  },
  signinUser: async (req, resp, next) => {
    try {
      const { body } = req;
      const data = await userService.signinUser(body, resp);

      return resp.status(200).json({
        data,
      });
    } catch (error) {
      return resp.status(500).json({
        message: "Internal server error",
        error: error?.message,
      });
    }
  },
  signoutUser: (req, resp, next) => {
    try {
      const data = userService.signoutUser(resp);
      return resp.status(200).json({
        data,
      });
    } catch (error) {
      return resp.status(500).json({
        message: "Internal server error",
        error: error?.message,
      });
    }
  },
  loggedInUser: async (req, resp, next) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return resp.status(404).json({
          message: "token not found",
        });
      }

      const payload = JWT.verify(token, process.env.JWT_SECRET);
      const { _id } = payload;
      const data = await userService.loggedInUser(_id);

      return resp.status(200).json({
        data,
      });
    } catch (error) {
      return resp.status(500).json({
        message: "Internal server error",
        error: error?.message,
      });
    }
  },
};

export default userController;
