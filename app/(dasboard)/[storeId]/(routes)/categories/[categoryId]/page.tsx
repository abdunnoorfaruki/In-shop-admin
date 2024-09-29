import React from "react";
import prismaDb from "@/lib/prismadb";
import CategoryFormForm from "../components/category-form";

const CategoryPage = async ({params}:{params:{categoryId:string, storeId:string}}) => {
  const category = await prismaDb.category.findFirst({
    where:{
      id:params.categoryId
    },
  })
  const billboards = await prismaDb.billboard.findMany({
    where:{
      storeId:params.storeId
    }
  })
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryFormForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
