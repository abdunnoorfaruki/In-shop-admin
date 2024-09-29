import prismaDb from "@/lib/prismadb"

export const getProductCount =async (storeId:string) => {
    const productCount = await prismaDb.product.count({
        where:{
            storeId,
            isArchived:false
        },
       
    })

   

    return productCount
}