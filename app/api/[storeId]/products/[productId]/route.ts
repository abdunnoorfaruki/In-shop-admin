import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = auth();
    const productId = params.productId;

    if (!productId)
      return new NextResponse("Product ID is required", { status: 400 });
    // get a single product by product ID
    const product = await prismaDb.product.findFirst({
      where: {
        id: productId,
      },
      include:{
        category:true,
        images:true,
        color:true,
        size:true
      }
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_BY_ID_GET]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const productId = params.productId;

    const body = await request.json();
    const {
      name,
      images,
      price,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
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
    // update the product
    await prismaDb.product.update({
      where: {
        id: productId,
      },
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
          deleteMany:{}
        }
      },
    });

    const product =   await prismaDb.product.update({
      where: {
        id: productId,
      },
      data: {
        storeId,
        images:{
          createMany:{
            data: [
              ...images.map((image:{url:string}) => image)
            ]
          }
        }
      },
    });


    

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_BY_ID_PATCH]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const productId = params.productId;

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

    await prismaDb.image.deleteMany({
      where: {
        productId: productId, // Assuming you're passing the product ID
      },
    });
    // Delete a product by product ID
    const product = await prismaDb.product.delete({
      where: {
        id: productId,
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error:any) {
    console.log("[PRODUCT_BY_ID_DELETE]: ", error.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
