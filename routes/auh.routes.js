import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', (reg, res) => res.send({title:'Sign Up'}));
authRouter.post('/sign-in', (reg, res) => res.send({title:'Sign In'}));
authRouter.post('/sign-out', (reg, res) => res.send({title:'Sign Out'}));

export default authRouter;