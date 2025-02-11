import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', (reg, res) => res.send({title:'Sign Up'}));