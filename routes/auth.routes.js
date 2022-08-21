import { Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from 'bcryptjs';

import User from "../models/User.js";
import Role from "../models/Role.js";

const router = new Router();

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
            return res.status(400).json({ message: 'User is exist' })
        };
        const hashedPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({ name: 'watcher' });
        const user = new User({ username, password: hashedPassword, roles: [userRole.name] });
        user.save();
        return res.json({ message: 'User has been successfully registered' })
    } catch (error) {
        console.error(error);
    }
})

router.post('/login', (req, res) => {

})

export default router;
