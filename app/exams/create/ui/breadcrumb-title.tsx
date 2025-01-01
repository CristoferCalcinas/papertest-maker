"use client";

import { usePathname } from "next/navigation";

import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeConfig = {
  "/exams": {
    title: "Exámenes",
    isActive: true,
  },
  "/exams/create": {
    title: "Crear Examen",
    isActive: false,
  },
};

export const BreadcrumbTitle = () => {
  const pathname = usePathname();

  const currentRoute = routeConfig[pathname as keyof typeof routeConfig];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/exams"
            className={`text-sm ${
              pathname === "/exams"
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Exámenes
          </BreadcrumbLink>
        </BreadcrumbItem>
        {currentRoute && currentRoute.title !== "Exámenes" && (
          <>
            <BreadcrumbSeparator>
              <Slash className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-medium">
                {currentRoute.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
