import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const body = await request.json();
    const { name, value } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!storeId)
      return new NextResponse("storeId is required", { status: 400 });

    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value)
      return new NextResponse("Value is required", { status: 400 });

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });
    // update the color name
    const color = await prismaDb.color.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log("[COLOR_POST]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;

    if (!storeId)
      return new NextResponse("storeId is required", { status: 400 });
    // get all colors
    const colors = await prismaDb.color.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(colors, { status: 200 });
  } catch (error) {
    console.log("[COLORS_GET]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

