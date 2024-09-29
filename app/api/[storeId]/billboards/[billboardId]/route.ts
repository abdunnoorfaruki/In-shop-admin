import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { userId } = auth();
    const billboardId = params.billboardId;
    if (!billboardId)
      return new NextResponse("storeId is required", { status: 400 });
    // get all billboard
    const billboard = await prismaDb.billboard.findFirst({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARD_POST]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const billboardId = params.billboardId;

    const body = await request.json();
    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!storeId)
      return new NextResponse("storeId is required", { status: 400 });

    if (!label) return new NextResponse("Label is required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("Image URL is required", { status: 400 });

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });
    // update the billboard name
    const billboard = await prismaDb.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARD_POST]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const billboardId = params.billboardId;

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

    // update the store name
    const store = await prismaDb.billboard.deleteMany({
      where: {
        id: billboardId,
      },
    });
    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log("[STORE_DELETE]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
