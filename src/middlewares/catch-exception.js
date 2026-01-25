export const catchError =  (err, req, res, next) => {
    const message = err.message;
    const code = err.code;
    return res.status().json({
        message, code
    })
}