import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;

  const {
    name,
    phone,
    card_number,
    birth_date,
    national_code,
    medical_number,
    email,
  } = await req.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${id}/edit`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({
          name,
          phone,
          card_number,
          birth_date,
          national_code,
          medical_number,
          email,
        }),
      }
    );
    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        data,
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Doctor editted successfuly" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    const data = await response.json();
    console.log(data);

    return NextResponse.json(
      { message: "Doctor deleted successfuly" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
