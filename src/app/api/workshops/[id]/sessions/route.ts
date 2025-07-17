import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.cookies.get("token");
    const { id } = await params;

    const jsonBody = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/workshops/${id}/sessions`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(jsonBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Session creation error:", errorData);

      return NextResponse.json(
        { message: "خطا در ایجاد جلسه", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/workshops/[id]/sessions error:", error.message);
    return NextResponse.json(
      { message: "مشکلی در سرور رخ داد", error: error.message },
      { status: 500 }
    );
  }
}
