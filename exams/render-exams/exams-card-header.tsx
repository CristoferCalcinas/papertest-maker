import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TopBarProps {
  onSort: (sortType: "date" | "title" | "questions") => void;
  onSearch: (term: string) => void;
  onViewToggle: () => void;
  view: "grid" | "list";
}

export function ExamsCardHeader({
  onSort,
  onSearch,
  onViewToggle,
  view,
}: TopBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center w-full sm:w-auto">
        <Input
          type="text"
          placeholder="Buscar exámenes..."
          className="mr-2"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button size="icon" variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select onValueChange={onSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Fecha</SelectItem>
            <SelectItem value="title">Título</SelectItem>
            <SelectItem value="questions">Número de preguntas</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onViewToggle} variant="outline">
          {view === "grid" ? "Lista" : "Tarjetas"}
        </Button>
        <Button>Nuevo Examen</Button>
      </div>
    </div>
  );
}
