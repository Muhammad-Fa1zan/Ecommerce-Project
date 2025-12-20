import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import { jwtToken } from '../utlis/jwtToken.js';

export const signup = asyncHandler(async (req, res) => {

   const { firstname, lastname, email, password,} =  req.body;

   if (!firstname|| !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
   };

   const userExisted = await User.findOne({ email });
   if (userExisted) {
      res.status(400);
      throw new Error('User already existed');
   };

   const user = await User.create({
      firstname,
      lastname,
      email,
      password,
   });

   return res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: 'user',
      token: jwtToken(user._id)
   }, { message: 'Succesfully Signup' });

});

export const login = asyncHandler(async (req, res) => {

   const { email, password } = req.body;

   if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
   }

   const user = await User.findOne({ email });

   if (!user) {
      res.status(401)
      throw new Error('First you have to create account')
   }
   const isPassMatch = await user.matchPassword(password)
   if (!isPassMatch) {
      res.status(400);
      throw new Error('Invalid email or password');
   };

   return res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      token: jwtToken(user._id),
   }, { message: 'Succesfully Login' });
});

export const getUser = asyncHandler(async (req, res) => {
   const user = req.user;
   console.log(user);
   return res.status(200).json(user);
});
