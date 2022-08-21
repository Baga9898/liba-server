import { Router } from "express";
import Role from "../models/Role.js";

const router = new Router();
const basePath = '/roles';

router.post(basePath, (req, res) => {
    
})

router.get(basePath, (req, res) => {
    res.send('roles here')
})

router.get(`${basePath}/:id`, (req, res) => {
    
})

router.put(`${basePath}/:id`, (req, res) => {
    
})

router.delete(`${basePath}/:id`, (req, res) => {
    
})

export default router;
