import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please enter a category"]
    },
    status: {
        type: Number,
        required: true,
        default: 1,
        enum: [0, 1]
    }
}, { timestamps: true });

export const categoryModel = mongoose.models.category || mongoose.model('category', categorySchema);