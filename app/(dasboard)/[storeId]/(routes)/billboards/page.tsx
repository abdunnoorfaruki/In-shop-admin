import React from "react";

import {format} from "date-fns"
import prismaDb from "@/lib/prismadb";

import { BillboardClient } from "./components/BillboardClient";
import { BillboardColumn } from "./components/columns";

const Billboard = async ({params}:{params:{storeId:string}}) => {
  const billboards = await prismaDb.billboard.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  const formatedBillboards:BillboardColumn[] = billboards.map((billboard) =>({
    id:billboard.id,
    label:billboard.label,
    createdAt:format(billboard.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatedBillboards} />
      </div>
    </div>
  );
};

export default Billboard;
