import { Router } from "express";
import { check, validationResult } from "express-validator";

import { authMiddleWare } from '../middleware/auth.middleware.js';
import bcrypt from 'bcryptjs';
import config from 'config';
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Role from "../models/Role.js";

const router = new Router();

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles,
    }
    return jwt.sign(payload, config.get('secret'), { expiresIn: '24h' });
}

router.post('/registration', [
        check('username', 'Cannot be empty').notEmpty(),
        check('password', 'Password must be longer than 3 characters').isLength({ min: 3 }),
    ], async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ message: 'Registration error', errors });
        }
        const { username, password } = req.body;
        const candidate = await User.findOne({ username });
        if (candidate) {
            return res.status(400).json({ message: 'User is exist' });
        };
        const hashedPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({ name: 'watcher' });
        const user = new User({ username, password: hashedPassword, roles: [userRole.name] });
        user.save();
        return res.json({ user: user.username, message: 'User has been successfully registered' })
    } catch (error) {
        console.error(error);
    }
})

router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: `User with name ${username} does not exist` });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: `Uncorrect password` });
        }
        const token = generateAccessToken(user._id, user.roles);
        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                roles: user.roles,
            },
            message: 'login successful',
        });
    } catch (error) {
        console.error(error);
    }
})

router.get('/auth', authMiddleWare, async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const token = generateAccessToken(user._id, user.roles);
        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                roles: user.roles,
            },
        });
    } catch (error) {
        console.error(error);
    }
})

export default router;
