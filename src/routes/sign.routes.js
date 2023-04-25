import { Router } from "express";
import { validateSignSchema } from "../middlewares/sign.validate.middleware.js";
import { signUpSchema } from "../schemas/sign.schema.js";
import { signUp } from "../controllers/sign.controllers.js";


const signRouter = Router()

signRouter.post("/sign-up", validateSignSchema(signUpSchema), signUp)


export default signRouter