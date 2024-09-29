"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ApiLists from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

import { Plus } from "lucide-react";


interface SizeClientProps {
  data:SizeColumn[]
}

export const SizeClient:React.FC<SizeClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Size(${data.length})`}
          description="Manage sizes for your store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)} >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Api calls for sizes" />
      <Separator />
      <ApiLists entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
