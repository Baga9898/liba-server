import mongoose from 'mongoose';

const Resource = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    link: { type: String, required: true, unique: true },
    description: { type: String },
    createDate: { type: Date, required: true, default: Date.now },
    changedBy: {type: String},
    modifiedDate: { type: Date, default: Date.now },
    categories: { type: Array },
})

export default mongoose.model('Resource', Resource);
