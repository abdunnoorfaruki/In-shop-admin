"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { columns, ProductColumn } from "./columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ApiLists from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

import { Plus } from "lucide-react";


interface ProductClientProps {
  data:ProductColumn[]
}

export const ProductClient:React.FC<ProductClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Products(${data.length})`}
          description="Manage products for your store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)} >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Api calls for products" />
      <Separator />
      <ApiLists entityName="products" entityIdName="productId" />
    </>
  );
};
