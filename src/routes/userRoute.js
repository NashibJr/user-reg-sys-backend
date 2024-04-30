import { Router } from "express";
import userController from "../controllers/userController.js";
import validateForms from "../middlewares/validateForm.js";
import { signupSchema } from "../validation/validationSchemas.js";

const userRoute = Router();

userRoute.post(
  "/user",
  (req, resp, next) => validateForms(req, resp, next)(signupSchema),
  userController.signupUser
);
userRoute.post("/user/signin", userController.signinUser);
userRoute.post("/user/signout", userController.signoutUser);
userRoute.get("/user", userController.loggedInUser);

export default userRoute;
