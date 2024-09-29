// react and next
import React from "react";
import { redirect } from "next/navigation";

// prisma
import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

// components
import Navbar from "@/components/navbar";

export default async function DashboardLayout({ children, params }: {
    children: React.ReactNode;
    params: { storeId: string };
  }) {
    const {userId} = auth()
    const storeId = params.storeId

    if(!userId) {
        redirect("/sign-in")
    }

    const store = await prismaDb.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    })
    if(!store) {
        redirect("/")
    }

    return (
        <div>
           <Navbar/>
            {
                children
            }
        </div>
    )
  }
