import React from "react";

import {format} from "date-fns"
import prismaDb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductClient } from "./components/ProductClient";
import { ProductColumn } from "./components/columns";

const ProductPage = async ({params}:{params:{storeId:string}}) => {
  const products = await prismaDb.product.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      category:true,
      color:true,
      size:true,
      images:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  const formatedProducts:ProductColumn[] = products.map((product) =>({
    id:product.id,
    name:product.name,
    category:product.category.name,
    size:product.size.name,
    color:product.color.name,
    isFeatured:product.isFeatured,
    isArchived:product.isArchived,
    image: product.images.map((image) => image.url),
    price:formatter.format(product.price.toNumber()),
    createdAt:format(product.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formatedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
