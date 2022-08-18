import Router from "express";
import Resource from "../models/Resource.js";

const router = new Router();

router.post('/resources', async(req, res) => {
    try {
        const { name, link, description, createDate, modifiedDates, categories } = req.body;
        const resource = new Resource({ name, link, description, createDate, modifiedDates, categories });
        await resource.save();
        return res.json(resource);
    } catch (error) {
        res.json(error);
    }
})

export default router;
