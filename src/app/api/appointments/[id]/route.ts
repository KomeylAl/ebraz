import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
   req: NextRequest,
   { params }: { params: { id: string } }
 ) {
   const token = req.cookies.get("token");
   const { id } = await params;
 
   if (!token || !token.value) {
     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
 
   try {
     const response = await fetch(
       `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/appointments/${id}`,
       {
         method: "DELETE",
         headers: {
           "Content-type": "application/json",
           Authorization: `Bearer ${token?.value}`,
         },
       }
     );
 
     if (!response.ok) {
       return NextResponse.json(
         { message: "Error deleteing appointments" },
         { status: response.status }
       );
     }
 
     return NextResponse.json(
       { message: "Appointment deleted successfully" },
       { status: 200 }
     );
   } catch (error) {
     return NextResponse.json(
       { message: "Something went wrong" },
       { status: 500 }
     );
   }
 }