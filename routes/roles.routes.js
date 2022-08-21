import { Router } from "express";
import Role from "../models/Role.js";

const router = new Router();
const basePath = '/roles';

router.post(basePath, async(req, res) => {
    try {
        const { name, description } = req.body;
        const role = new Role({ name, description });
        await role.save();
        return res.json(role);
    } catch (error) {
        res.json(error);
    }
})

router.get(basePath, async(req, res) => {
    try {
        const role = await Role.find();
        return res.json(role);
    } catch (error) {
        res.json(error);
    }
})

router.get(`${basePath}/:id`, async(req, res) => {
    try {
        const {id} = req.params;
        !id && res.status(400).json({ message: 'ID don\'t exist' });
        const role = await Role.findById(id);
        return res.json(role);
    } catch (error) {
        res.json(error);
    }
})

router.put(`${basePath}/:id`, async(req, res) => {
    try {
        const {id} = req.params;
        const { name, description } = req.body;
        const role = ({ name, description });
        !id && res.status(400).json({message: 'ID don\'t exist'});
        const updatedRole = await Role.findByIdAndUpdate(id, role, {new: true});
        return res.json(updatedRole);
    } catch (error) {
        res.json(error);
    }
})

router.delete(`${basePath}/:id`, async(req, res) => {
    try {
        const {id} = req.params;
        !id && res.status(400).json({message: 'ID don\'t exist'});
        const role = await Role.findByIdAndDelete(id);
        return res.json(role);
    } catch (error) {
        res.json(error);
    }
})

export default router;
