import mongoose from "mongoose";

const question =  new mongoose.Schema({
    category_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'category',
        required: true,
    },
    question :{
        type: String,
        required: true
    },
    options:{
        type : Array,
        required: true
    },
    correctOption :{
        type:String,
        required: true
    }
},{timestamps: true})

export const questionModel = mongoose.models.questions || mongoose.model('questions', question)