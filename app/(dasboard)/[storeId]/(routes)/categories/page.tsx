import React from "react";

import { format } from "date-fns";
import prismaDb from "@/lib/prismadb";

import { CategoryClient } from "./components/CategoryClient";
import { CategoryColumn } from "./components/columns";

const Categories = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismaDb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedBillboards: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formatedBillboards} />
      </div>
    </div>
  );
};

export default Categories;
