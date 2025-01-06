"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { AnalysisPanel } from "./analysis-panel";
import { ExamCreation } from "./exam-creation";
import { MainMetrics } from "./main-metrics";
import { RecentActivity } from "./recent-activity";
import { UserStatistics } from "./user-statistics";

export const StadisticsTabs = () => {
  return (
    <div className="flex-1 space-y-4 px-8 md:pt-2">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
          <TabsTrigger value="exams">Exámenes</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <MainMetrics />
          <RecentActivity />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <AnalysisPanel />
        </TabsContent>
        <TabsContent value="exams" className="space-y-4">
          <ExamCreation />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <UserStatistics />
        </TabsContent>
      </Tabs>
    </div>
  );
};
