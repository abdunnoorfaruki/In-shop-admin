import React from "react";
import prismaDb from "@/lib/prismadb";
import SizeForm from "../components/size-form";

const BillboardPage = async ({params}:{params:{sizeId:string}}) => {
  const size = await prismaDb.size.findFirst({
    where:{
      id:params.sizeId
    }
  })

  console.log("Size: ", size)
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default BillboardPage;
