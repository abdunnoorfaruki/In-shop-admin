import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const body = await request.json();
    const { name } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!storeId)
      return new NextResponse("storeId is required", { status: 400 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    // update the store name
    const store = await prismaDb.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store, {status:200})
  } catch (error) {
    console.log("[STORE_PATCH]: ", error)
    return new NextResponse("Internal Error", {status:500})
  }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { storeId: string } }
  ) {
    try {
      const { userId } = auth();
      const storeId = params.storeId;
  
      if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
  
      if (!storeId)
        return new NextResponse("storeId is required", { status: 400 });
  
  
      // update the store name
      const store = await prismaDb.store.deleteMany({
        where: {
          id: storeId,
          userId,
        },
      });
      return NextResponse.json(store, {status:200})
    } catch (error) {
      console.log("[STORE_PATCH]: ", error)
      return new NextResponse("Internal Error", {status:500})
    }
  }
  
