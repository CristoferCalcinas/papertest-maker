"use client";

import { BsFillTrash3Fill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { DividerButton } from "./divider-button";
import { TooltipProvider } from "@/components/ui/tooltip";

export const ExamFormDivider = () => {
  const handleEdit = () => console.log("Edit clicked");
  const handleAttach = () => console.log("Attach clicked");
  const handleComment = () => console.log("Comment clicked");
  const handleDelete = () => console.log("Delete clicked");

  const buttons = [
    {
      label: "Editar",
      icon: <FaPencilAlt />,
      onClick: handleEdit,
      className: "rounded-l-md",
    },
    { label: "Adjuntar", icon: <FiPaperclip />, onClick: handleAttach },
    {
      label: "Comentarios",
      icon: <IoChatboxEllipsesOutline />,
      onClick: handleComment,
    },
    {
      label: "Eliminar",
      icon: <BsFillTrash3Fill />,
      onClick: handleDelete,
      className: "rounded-r-md",
    },
  ];

  return (
    <div
      className="relative mt-0 md:mt-10"
      role="toolbar"
      aria-label="Acciones del examen"
    >
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <TooltipProvider>
          <span className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            {buttons.map((button) => (
              <DividerButton key={button.label} {...button} />
            ))}
          </span>
        </TooltipProvider>
      </div>
    </div>
  );
};
