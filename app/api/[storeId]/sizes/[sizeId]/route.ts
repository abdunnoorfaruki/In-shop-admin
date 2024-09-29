import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { sizeId: string } }
) {
  try {
    const { userId } = auth();
    const sizeId = params.sizeId;
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!sizeId)
      return new NextResponse("storeId is required", { status: 400 });
    // get all size
    const size = await prismaDb.size.findFirst({
      where: {
        id: sizeId,
      },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("SIZE_BY_ID_GET]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const sizeId = params.sizeId;

    const body = await request.json();
    const { name, value } = body;
    console.log("body: ", body)

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
    // update the size name
    const size = await prismaDb.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("[SIZE_PATCH]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const sizeId = params.sizeId;

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

    // delete the size
    const size = await prismaDb.size.deleteMany({
      where: {
        id: sizeId,
      },
    });
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("[SEZE_BY_ID_DELETE]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
