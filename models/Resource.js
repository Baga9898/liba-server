import mongoose from 'mongoose';

const Resource = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    link: { type: String, required: true, unique: true },
    description: { type: String },
    createDate: { type: Date, required: true },
    modifiedDates: { type: Array },
    categories: { type: Array },
})

export default mongoose.model('Resource', Resource);
