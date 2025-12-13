import express from "express";



const authRouter = express.Router();

authRouter.post('/signup' , signup );
authRouter.post('/login' , login);

export default authRouter
