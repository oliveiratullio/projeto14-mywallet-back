import { Router } from "express"
import { authValidation } from "../middlewares/auth.midlleware.js"
import { validateSchema } from "../middlewares/sign.validate.middleware.js"
import { transactionSchema } from "../schemas/transcaction.schema.js"
import { listTransaction, transaction } from "../controllers/transaction.controller.js"


const transactionRouter = Router()
transactionRouter.use(authValidation)
transactionRouter.post("/transactions", validateSchema(transactionSchema), transaction)
transactionRouter.get("/transactions", listTransaction)

export default transactionRouter