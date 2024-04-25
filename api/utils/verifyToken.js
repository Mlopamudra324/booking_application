import jwt from 'jsonwebtoken';
import createError from '../utils/error.js';


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "you are not authenticated"))
    }

    jwt.verify(token, "sdfsdfs", (err, user) => {
        if (err) return next(createError(403, "token is not valid!"))
        //if there is no error we set new req property
        req.user = user; //here in this req.user we can use any name instaed of user like req.hello etc. and the 2nd user is the information.
        next()
    }) //this user include {id : user._id, isAdmin: user.isAdmin} information
}

export const verifyUser = (req, res, next, err) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, "your are not authorized"))
        }
    })
}
export const verifyAdmin = (req, res, next, err) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, "your are not authorized"))
        }
    })
}