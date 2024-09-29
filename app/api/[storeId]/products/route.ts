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
    const {
      name,
      images,
      price,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived
    } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!storeId)
      return new NextResponse("storeId is required", { status: 400 });

    if (!name || !price || !categoryId || !sizeId || !colorId)
      return new NextResponse(
        "Name, Price, Category ID, Size ID, Color ID are required",
        { status: 400 }
      );
    if (images.length <= 0)
      return new NextResponse("Image is required", { status: 400 });
    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });
    // Create new product
    const product = await prismaDb.product.create({
      data: {
        storeId,
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images:{
          createMany:{
            data:[...images.map((image:{url:string}) => image)]
          }
        }
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_POST]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request:NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
  const { searchParams} = new URL(request.url)
  const categoryId = searchParams.get("categoryId") || undefined;
  const colorId = searchParams.get("colorId") || undefined;
  const sizeId = searchParams.get("sizeId") || undefined;
  const isFeatured = searchParams.get("isFeatured") ? true:undefined;
    


   

    if (!params.storeId)
      return new NextResponse("storeId is required", { status: 400 });
    // get all products
    const products = await prismaDb.product.findMany({
      where: {
        storeId:params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived:false
      },
      include:{
        size:true,
        category:true,
        color:true,
        images:true,
      },

    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log("[PRODUCTS_GET]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
