"use client";

import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DatePickerWithRangeProps {
  onChange: (range: DateRange | undefined) => void;
  value: DateRange | undefined;
  className?: string;
}

export function DatePickerWithRange({
  onChange,
  value,
  className,
}: DatePickerWithRangeProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -10),
    to: new Date(),
  });

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onChange(newDate);
  };

  return (
    <div className={cn(className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/y", { locale: ptBR })} a{" "}
                  {format(date.to, "dd/MM/y", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd/MM/y", { locale: ptBR })
              )
            ) : (
              <span>Escolher uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 capitalize" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            locale={ptBR}
            initialFocus
            defaultMonth={date?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
