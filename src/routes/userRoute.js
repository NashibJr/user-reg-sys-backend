import { Router } from "express";
import userController from "../controllers/userController.js";
import validateForms from "../middlewares/validateForm.js";
import { signupSchema } from "../validation/validationSchemas.js";

const userRoute = Router();

userRoute.post(
  "/users",
  (req, resp, next) => validateForms(req, resp, next)(signupSchema),
  userController.signupUser
);

export default userRoute;
