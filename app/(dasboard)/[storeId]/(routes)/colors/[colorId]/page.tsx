import React from "react";
import prismaDb from "@/lib/prismadb";
import ColorForm from "../components/colors-form";

const BillboardPage = async ({params}:{params:{colorId:string}}) => {
  const size = await prismaDb.color.findFirst({
    where:{
      id:params.colorId
    }
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={size} />
      </div>
    </div>
  );
};

export default BillboardPage;
