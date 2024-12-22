import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;
  
  console.log("email",email)
  if (!email || !password) {
    return NextResponse.json({ status: 400, message: "Invalid email or password" });
  } else if (process.env.ADMIN_EMAIL !== email) {
    return NextResponse.json({ status: 400, message: "Invalid email" });
  } else if (process.env.ADMIN_PASSWORD !== password) {
    return NextResponse.json({ status: 400, message: "Invalid password" });
  } else {
    
    const token = jwt.sign({ email }, process.env.JWT_TOKEN!,{ expiresIn: '1h' });
    return NextResponse.json({ status: 200, message: "Login success", token });
  }
}


