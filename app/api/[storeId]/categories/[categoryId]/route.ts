import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();
    const categoryId = params.categoryId;

    if (!categoryId)
      return new NextResponse("storeId is required", { status: 400 });
    // get all category
    const category = await prismaDb.category.findFirst({
      where: {
        id: categoryId,
      },
      include:{
        billboard:true
      }
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_POST]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const categoryId = params.categoryId;

    const body = await request.json();
    const { name, billboardId } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!storeId)
      return new NextResponse("storeId is required", { status: 400 });

    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("Category ID is required", { status: 400 });

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });
    // update the billboard name
    const category = await prismaDb.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_BY_ID_PATCH]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const categoryId = params.categoryId;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!storeId)
      return new NextResponse("StoreId is required", { status: 400 });

    if (!categoryId)
      return new NextResponse("Category is required", { status: 400 });

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    // delete the category
    const category = await prismaDb.category.deleteMany({
      where: {
        id: categoryId,
        storeId
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_DELETE]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
