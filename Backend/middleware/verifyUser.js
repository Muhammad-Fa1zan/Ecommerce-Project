import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';


export const verifyUser = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

        if (!token) {
            res.status(401);
            throw new Error("Not authorized, token missing");
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const verifiedUser = await User.findById(decoded.id).select('-password');

        if (!verifiedUser) {
            res.status(401);
            throw new Error("Not authorized, user not found");
        }

        req.user = verifiedUser;
        return next()
    }

    res.status(401);
    throw new Error("Not authorized, no token");
})