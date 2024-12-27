import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { DashboardHeaderCard } from "@/exams/dashboard/dashboard-header/dashboard-header-card";
import { DashboardHeader } from "@/exams/dashboard/dashboard-header/dashboard-header";
import { DashboardMain } from "@/exams/dashboard/dashboard-main/dashboard-main";

export default async function Page() {
  const session = await auth();
  if (session?.user.roleId === "no-role-id") {
    redirect("/auth/select-role");
  }
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Paper Test Maker
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <DashboardHeader />

          <DashboardHeaderCard />

          <DashboardMain />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
