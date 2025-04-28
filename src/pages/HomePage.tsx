import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress"; // Example shadcn component

export function HomePage() {
  const { t } = useTranslation();

  // Mock data for demonstration
  const recentSales = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
    { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
  ];

  return (
    <div>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{t("dashboardTitle", "Dashboard")}</h2>
          {/* Add controls like Date Picker here if needed */}
          <div className="flex items-center space-x-2">
            <Button>{t("download", "Download")}</Button>
          </div>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">{t("overview", "Overview")}</TabsTrigger>
            <TabsTrigger value="analytics" disabled>{t("analytics", "Analytics")}</TabsTrigger>
            <TabsTrigger value="reports" disabled>{t("reports", "Reports")}</TabsTrigger>
            <TabsTrigger value="notifications" disabled>{t("notifications", "Notifications")}</TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("totalRevenue", "Total Revenue")}</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% {t("fromLastMonth", "from last month")}</p>
                  <Progress value={75} className="mt-2 h-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("subscriptions", "Subscriptions")}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">+180.1% {t("fromLastMonth", "from last month")}</p>
                  <Progress value={90} className="mt-2 h-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("sales", "Sales")}</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">+19% {t("fromLastMonth", "from last month")}</p>
                  <Progress value={40} className="mt-2 h-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("activeNow", "Active Now")}</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+201 {t("sinceLastHour", "since last hour")}</p>
                  <Progress value={65} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Sales Table */}
            <Card>
              <CardHeader>
                <CardTitle>{t("recentSales", "Recent Sales")}</CardTitle>
                <CardDescription>{t("recentSalesDesc", "You made 265 sales this month.")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">{t("name", "Name")}</TableHead>
                      <TableHead>{t("email", "Email")}</TableHead>
                      <TableHead className="text-right">{t("amount", "Amount")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.map((sale, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sale.name}</TableCell>
                        <TableCell>{sale.email}</TableCell>
                        <TableCell className="text-right">{sale.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placeholder for other Tabs Content */}
          {/* <TabsContent value="analytics">Analytics Content Here</TabsContent> */}
          {/* <TabsContent value="reports">Reports Content Here</TabsContent> */}
          {/* <TabsContent value="notifications">Notifications Content Here</TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}

export default HomePage; 