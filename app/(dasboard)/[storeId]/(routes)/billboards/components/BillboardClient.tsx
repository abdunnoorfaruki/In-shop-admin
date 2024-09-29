"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ApiLists from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

import { Plus } from "lucide-react";


interface BillboardClientProps {
  data:BillboardColumn[]
}

export const BillboardClient:React.FC<BillboardClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Billboard(${data.length})`}
          description="Manage billboards for your store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)} >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="Api calls for billboards" />
      <Separator />
      <ApiLists entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
