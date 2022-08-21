import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
    favourites: [{type: Array, ref: 'Resource'}]
})

export default mongoose.model('User', User);
