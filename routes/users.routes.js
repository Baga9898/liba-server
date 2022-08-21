import { Router } from "express";
import User from "../models/User.js";

const router = new Router();
const basePath = '/users';

router.post(basePath, (req, res) => {
    
})

router.get(basePath, (req, res) => {
    
})

router.get(`${basePath}/:id`, (req, res) => {
    
})

router.put(`${basePath}/:id`, (req, res) => {
    
})

router.delete(`${basePath}/:id`, (req, res) => {
    
})

export default router;
