import Router from "express";
import Resource from "../models/Resource.js";

const router = new Router();
const basePath = '/resources';

router.post(basePath, async(req, res) => {
    try {
        const { name, link, description, createDate, modifiedDates, categories } = req.body;
        const resource = new Resource({ name, link, description, createDate, modifiedDates, categories });
        await resource.save();
        return res.json(resource);
    } catch (error) {
        res.json(error);
    }
})

router.get(basePath, async(req, res) => {
    try {
        const query = req.query;
        let resources;

        query.hasOwnProperty('categories') ?
            resources = await Resource.find(query) : resources = await Resource.find();

        return res.json(resources);
    } catch (error) {
        res.json(error);
    }
})

export default router;
