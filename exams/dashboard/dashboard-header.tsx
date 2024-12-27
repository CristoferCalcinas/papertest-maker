"use client";

import Link from "next/link";

import { FaListUl } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";

import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <div>
      <section className="rounded-xl p-0 max-w-3xl mx-auto flex justify-between items-center xl:p-4">
        <h1 className="text-4xl font-bold tracking-tighter ml-2">Dashboard</h1>

        <nav className="flex gap-2">
          <Link href="/exams/create" className="group">
            <Button className="group-hover:underline">
              <span className="hidden md:block tracking-tighter">
                Crear un nuevo examen
              </span>
              <MdAddCircleOutline className="md:hidden" />
            </Button>
          </Link>

          <Link href="/exams" className="group">
            <Button variant={"secondary"} className="group-hover:underline">
              <span className="hidden md:block font-semibold tracking-tighter">
                Ver todos los exámenes
              </span>
              <FaListUl className="md:hidden" />
            </Button>
          </Link>
        </nav>
      </section>
    </div>
  );
};
