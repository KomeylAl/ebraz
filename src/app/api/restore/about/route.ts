import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const token = req.cookies.get("token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/restore/about`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({ data }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      return NextResponse.json(
        { message: `${error ?? "خطا در بازگردانی"}` },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json(JSON.stringify(result), {
      status: response.status,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
