import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; //! Adjust the path as necessary

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split('')[1];
        }

        if (!token) return res.status(401).json({message:'Unauthorized'});

        const decode = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decode.userId);

        if(!user) return res.status(401).json({message: 'Unauthorized'});

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            error: error.message,
            message: 'Unauthorized',
        });
    }
}

export default authorize; // Adjust the path as necessary