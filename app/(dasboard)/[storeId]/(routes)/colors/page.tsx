import React from "react";

import {format} from "date-fns"
import prismaDb from "@/lib/prismadb";

import { ColorClient } from "./components/ColorClient";
import { ColorColumn } from "./components/columns";

const ColorPage = async ({params}:{params:{sizeId:string}}) => {
  const colors = await prismaDb.color.findMany({
    where:{
      storeId:params.sizeId
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  const formatedColors:ColorColumn[] = colors.map((color) =>({
    id:color.id,
    name:color.name,
    value:color.value,
    createdAt:format(color.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formatedColors} />
      </div>
    </div>
  );
};

export default ColorPage;
