import React from "react";

import {format} from "date-fns"
import prismaDb from "@/lib/prismadb";

import { SizeClient } from "./components/SizeClient";
import { SizeColumn } from "./components/columns";

const SizesPage = async ({params}:{params:{sizeId:string}}) => {
  const sizes = await prismaDb.size.findMany({
    where:{
      storeId:params.sizeId
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  const formatedSizes:SizeColumn[] = sizes.map((size) =>({
    id:size.id,
    name:size.name,
    value:size.value,
    createdAt:format(size.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formatedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
