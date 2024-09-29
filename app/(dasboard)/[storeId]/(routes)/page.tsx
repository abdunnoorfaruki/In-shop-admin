import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getProductCount } from "@/actions/get-product-count";
import { getSalseCount } from "@/actions/get-salse-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismaDb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, IndianRupeeIcon, Package } from "lucide-react";
import React from "react";

interface DasboardPageProps {
  params: { storeId: string };
}
const DashboardPage: React.FC<DasboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId)
  const salseCount = await getSalseCount(params.storeId)
  const productInStock = await getProductCount(params.storeId)
  const graphData = await getGraphRevenue(params.storeId)
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Total Revenue
              </CardTitle>
              <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Sales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salseCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Product In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productInStock}</div>
            </CardContent>
          </Card>

          <Card className="col-span-4" >
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2" >
              <Overview data={graphData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
