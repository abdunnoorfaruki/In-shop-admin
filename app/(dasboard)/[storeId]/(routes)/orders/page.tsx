import React from "react";

import { formatter } from "@/lib/utils";
import prismaDb from "@/lib/prismadb";

import { OrderClient } from "./components/OrderClient";
import { OrderColumn } from "./components/columns";

const OrdersPage = async ({params}:{params:{storeId:string}}) => {
  const orders = await prismaDb.order.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      orderItems:{
        include:{
          product:true
        }
      }
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  const formatedOrders:OrderColumn[] = orders.map((order) =>({
    id:order.id,
    phone:order.phone,
    address:order.address,
    products: order.orderItems.map((orderItem) => orderItem.product.name).join(", "),
    totalPrice: formatter.format(order.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    },0)),
    isPaid:order.isPaid
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formatedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
