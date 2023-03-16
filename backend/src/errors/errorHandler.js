export const Status = Object.freeze({
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    RequestTimeout: 408,
    UnsupportedMediaType: 415,
    InternalServerError: 500,
    BadGateway: 502,
    GatewayTimeout: 504,
});

export function errorHandler(err,req,res,next) {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err);
   res.status(err.code).send({Error: err.message});
}
