export function validateSchema(schema) {
    return(req, res, next) => {
        const {error} = schema.validate(req.body, {abortEarly: false});

        if(err){
            const errors = err.details.map( datails => datails.message);
            return res.status(422).send(errors);
        }
        next();
    }
}