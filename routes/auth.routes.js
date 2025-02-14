import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

//* Implement the routes 
//* Path: /api/v1/auth/sign-up, /api/v1/auth/sign-in, and /api/v1/auth/sign-out
authRouter.post('/sign-up', signUp);

authRouter.post('/sign-in', signIn);

authRouter.post('/sign-out', signOut);

export default authRouter;