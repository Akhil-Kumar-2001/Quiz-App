import { NextRequest, NextResponse } from "next/server";
import { questionModel } from "@/models/questionModel";
import { categoryModel } from "@/models/catergoryModel"; 
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const { newQuestion } = await req.json();
    const { category, question, options, correctOption } = newQuestion;

    const existingCategory = await categoryModel.findById(category);
    if (!existingCategory) {
      return NextResponse.json({ message: "Category not found",status: 404 });
    }

    const existingQuestion = await questionModel.findOne({ 
      category_id: category, 
      question: question 
    });

    if (existingQuestion) {
      return NextResponse.json({ message: "Question already exists",status: 400 });
    }

    const newQuestionDoc = new questionModel({
      category_id: category,
      question,
      options,
      correctOption,
    });

    await newQuestionDoc.save();

    return NextResponse.json({ message: "Question added successfully", status: 201 });
  } catch (error) {
    console.error("Error adding question:", error);
    return NextResponse.json({ message: "Internal server error",status: 500 });
  }
}