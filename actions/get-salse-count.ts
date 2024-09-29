import prismaDb from "@/lib/prismadb"

export const getSalseCount =async (storeId:string) => {
    const salseCount = await prismaDb.order.count({
        where:{
            storeId,
            isPaid:true
        },
       
    })

   

    return salseCount
}