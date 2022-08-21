import mongoose from "mongoose";

const Role = new mongoose.Schema({
    name: { type: String, unique: true, default: 'watcher' },
    description: { type: String }
})

export default mongoose.model('Role', Role);
