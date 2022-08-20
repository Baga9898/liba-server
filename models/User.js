import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }]
})

export default mongoose.model('User', User);
