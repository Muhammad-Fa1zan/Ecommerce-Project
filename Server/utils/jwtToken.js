import jwt from 'jsonwebtoken';

export const jwtToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_KEY
        ,
        { expiresIn: '7d' }
    );
};
