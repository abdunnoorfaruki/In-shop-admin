"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ApiLists from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

import { Plus } from "lucide-react";


interface CategoryClientProps {
  data:CategoryColumn[]
}

export const CategoryClient:React.FC<CategoryClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Categories(${data.length})`}
          description="Manage categories for your store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)} >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Api calls for cagegories" />
      <Separator />
      <ApiLists entityName="Categories" entityIdName="categoryId" />
    </>
  );
};
