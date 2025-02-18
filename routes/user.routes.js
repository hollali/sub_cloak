import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller"; // Adjust the path as necessary

const userRouter = Router();

userRouter.get("/" , getUsers);

userRouter.get("/:id" , getUser);

userRouter.post("/" , (req,res) => res.send({title:'CREATE new user'}));

userRouter.put("/:id" , (req,res) => res.send({title:'UPDATE users'}));

userRouter.delete("/:id" , (req,res) => res.send({title:'DELETE user'}));

export default userRouter;