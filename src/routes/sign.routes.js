import { Router } from "express";
import { validateSchema } from "../middlewares/sign.validate.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/sign.schema.js";
import { logout, signIn, signUp } from "../controllers/sign.controllers.js";


const signRouter = Router()

signRouter.post("/sign-up", validateSchema(signUpSchema), signUp)
signRouter.post("/sign-in", validateSchema(signInSchema), signIn)
signRouter.delete("/logout", logout)

export default signRouter