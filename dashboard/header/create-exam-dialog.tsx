"use client";

import { useSession } from "next-auth/react";
import { MdAddCircleOutline } from "react-icons/md";
import { FiFileText } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useExamForm } from "../hooks/useExamForm";
import { ExamFormContent } from "./exam-form-content";

export const CreateExamDialog = () => {
  const { data: session } = useSession();
  const { form, onSubmit } = useExamForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:underline" variant="default">
          <span className="hidden md:block tracking-tighter">Nuevo Examen</span>
          <MdAddCircleOutline className="md:hidden" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[485px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ExamFormContent form={form} session={session} />
          <DialogFooter>
            <Button type="submit">
              <FiFileText className="mr-2" />
              Crear Examen
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
