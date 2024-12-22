import { NextRequest, NextResponse } from "next/server";
import  {connect} from '../../../utils/dbConfig'
import  {categoryModel}  from '../../../models/catergoryModel';


export const GET = async () => {
    try {
    await connect(); // Ensure connection before proceeding
        const categories = await categoryModel.find({ status: 1 });
        return NextResponse.json({ status: 200, message: "Data fetched successfully", categories });
    } catch (error) {
        console.error("Failed to get category data:", error);
        return NextResponse.json({ status: 400, message: "Failed to get the category data" },{status:400});
    }
};


export const POST = async (req: NextRequest) => {
    await connect(); // Ensure connection before proceeding

    const { categoryName } = await req.json();
    try {
        const checkData = await categoryModel.find({ category: categoryName });
        if(!checkData.length)
        {
            const addCategory = await categoryModel.create({ category: categoryName });
            return NextResponse.json({ status: 200, message: "Category added successfully", data: addCategory });
        }
        else
        return NextResponse.json({ status: 400, message: "category already exist" });
    } catch (error) {
        return NextResponse.json({ status: 400, error });
    }
};