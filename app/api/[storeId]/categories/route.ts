import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const storeId:string = params.storeId;
    const body = await request.json();
    const { name, billboardId } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!storeId)
      return new NextResponse("storeId is required", { status: 400 });

    if (!name) return new NextResponse("Category name is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("Bilboard is required", { status: 400 });

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });
    // create the category
    const category = await prismaDb.category.create({
      data:{
        name,
        storeId,
        billboardId
      }
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_POST]: ", error);
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
    // get all categories
    const categories = await prismaDb.category.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_GET]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function DELETE(
//     request: NextRequest,
//     { params }: { params: { storeId: string } }
//   ) {
//     try {
//       const { userId } = auth();
//       const storeId = params.storeId;

//       if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

//       if (!storeId)
//         return new NextResponse("storeId is required", { status: 400 });

//       // update the store name
//       const store = await prismaDb.store.deleteMany({
//         where: {
//           id: storeId,
//           userId,
//         },
//       });
//       return NextResponse.json(store, {status:200})
//     } catch (error) {
//       console.log("[STORE_PATCH]: ", error)
//       return new NextResponse("Internal Error", {status:500})
//     }
//   }
