import asyncHandler from 'express-async-handler'

export const isAdmin = asyncHandler((req, res, next) => {
    if (req.user.role && req.user.role === 'admin') return next();

    res.status(403);
    throw new Error("Require admin role");
});