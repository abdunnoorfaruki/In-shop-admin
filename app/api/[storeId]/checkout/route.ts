import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripte";
import prismaDb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  
  try {
    const { productIds } = await request.json();
    console.log("ProductIds: ", productIds);
    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product ids are required", { status: 400 });
    }

    const products = await prismaDb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include:{
        images:true
      }
    });


    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: product.name,
            images:product.images.map((image) => image.url)
          },
          unit_amount: product.price.toNumber() * 100,
        },
      });
    });
    const order = await prismaDb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });


    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });
    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error: any) {
    console.log("[CHECKOUT_ERROR]: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
