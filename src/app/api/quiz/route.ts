import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/dbConfig"; 
import { questionModel } from "@/models/questionModel";
import { ObjectId } from "mongodb";


export async function POST(req: NextRequest) {
    console.log("inside server")
  try {
    const { selectedCategory, participantName } = await req.json();

    if (!selectedCategory || !participantName) {
      return NextResponse.json(
        { success: false, message: "Category and participant name are required" },
        { status: 400 }
      );
    }

    await connect(); // Make sure the connect function is working

    console.log("===================", participantName);

    // Ensure selectedCategory is an ObjectId
    const randomQuestions = await questionModel
      .find({ category_id: new ObjectId(selectedCategory) })
      .limit(20);

    // Check if questions are found
    if (randomQuestions.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No questions found for the selected category",
      });
    }

    // Convert Mongoose documents to plain objects if needed
    const questions = randomQuestions.map((question) => question.toObject());

    console.log(randomQuestions);
    return NextResponse.json({
      success: true,
      questions,
      participantName,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}