import Joi from "joi";

const transactionSchema = joi.object({
    description: joi.string().required(),
    value: joi.number().positive().precision(2).required(),
    type: joi.string().valid("entrada", "saida").required(),
});