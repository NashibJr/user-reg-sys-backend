import userService from "../services/userService.js";

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
};

export default userController;
