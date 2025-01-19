"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date
            ? format(date, "dd/MM/y", { locale: ptBR })
            : "Escolha uma data"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 capitalize" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
