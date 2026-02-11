export const validatorMiddleware = (schema) =>  (req, res, next) => {
    const body = req.body
    const {error, value} = schema.validate(body)
    console.log("error: ", error);
    if(error)
        return res.status(400).json({error: error.details})
    
    req.body = value
    next()
}