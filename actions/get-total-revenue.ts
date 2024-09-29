import prismaDb from "@/lib/prismadb"

export const getTotalRevenue =async (storeId:string) => {
    const paidOrders = await prismaDb.order.findMany({
        where:{
            storeId,
            isPaid:true
        },
        include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        }
    })

    const totalRevenue = paidOrders.reduce((tota, order) => {
        const totalOrder = order.orderItems.reduce((orderSum, item)=>{
            return orderSum + item.product.price.toNumber()
        },0)
        return tota + totalOrder
    },0)

    return totalRevenue
}