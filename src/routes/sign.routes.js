import { Router } from "express";
import { validateSignSchema } from "../middlewares/sign.validate.middleware";
import { signUpSchema } from "../schemas/sign.schema";
import { signUp } from "../controllers/sign.controllers";


const signRouter = Router()

signRouter.post("/sign-up", validateSignSchema(signUpSchema), signUp)