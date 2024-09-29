import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { colorId: string } }
) {
  try {
    const { userId } = auth();
    const colorId = params.colorId;
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!colorId)
      return new NextResponse("Color ID is required", { status: 400 });
    // get all size
    const color = await prismaDb.color.findFirst({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log("COLOR_BY_ID_GET]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const colorId = params.colorId;

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
    // update the color 
    const color = await prismaDb.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log("[COLOR_PATCH]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const colorId = params.colorId;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!storeId)
      return new NextResponse("storeId is required", { status: 400 });

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    // delete the color
    const color = await prismaDb.color.deleteMany({
      where: {
        id: colorId,
      },
    });
    console.log("Color: ", color)
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log("[COLOR_BY_ID_DELETE]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
