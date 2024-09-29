import prismaDb from "@/lib/prismadb";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    
    try {
        const { userId} = auth()
        const body =await request.json()
        const {name} = body
        console.log(userId)
        if(!userId) return new NextResponse("Unauthorized Access", {status:401})
        if(!name) return new NextResponse("Name is required", {status:400})
        
        const newStore = await prismaDb.store.create({data:{
            name,
            userId
        }})
        
        return NextResponse.json({data:newStore}, {status:201})
    } catch (error) {
        console.log("[STORES_POST]: ", error)
        return new NextResponse("Internal Error", {status:500})
    }
}