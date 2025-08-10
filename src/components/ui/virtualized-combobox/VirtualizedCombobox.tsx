import { useVirtualizer } from "@tanstack/react-virtual";
import {
  CheckCircle2,
  ChevronsUpDown,
  Info,
  PlusCircle,
  Search,
  XCircle,
} from "lucide-react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { Label } from "../label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

type Option = {
  id: string;
  label: string;
};

interface VirtualizedCommandProps {
  height: number;
  onSelectOption?: (option: string) => void;
  options: Option[];
  placeholder: string;
  searchInput: string;
  searching?: string;
  selectedOption: string;
  setSearchInput: (value: string) => void;
  setSearching?: (value: string) => void;
}

const VirtualizedCommand = ({
  height,
  onSelectOption,
  options,
  placeholder,
  searchInput,
  searching,
  selectedOption,
  setSearchInput,
  setSearching,
}: VirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  //console.log("Options:", options);
  //console.log("Filtered Options:", filteredOptions);

  const parentRef = useRef(null);
  // const parentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searching) {
      setSearchInput(searching);
      //console.log("Searching está definido: ", searching);
    } else {
      setSearchInput(searchInput);
      //console.log("SearchInput está atualizado: ", searchInput);
    }
  }, [searchInput, searching, setSearchInput]);

  useEffect(() => {
    //console.log("Filtro de opções: ", searchInput);
    if (searchInput) {
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(searchInput.toLowerCase() ?? []),
        ),
      );
      //console.log("Opções filtradas: ", filteredOptions);
    } else setFilteredOptions(options);
    //console.log("Sem filtro, todas as opções: ", options);
  }, [options, searchInput]);

  const ITEM_SIZE = 35;
  const offset = height / 2 - ITEM_SIZE / 2;

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    estimateSize: () => ITEM_SIZE,
    getScrollElement: () => parentRef.current,
    overscan: 0,
  });

  // * Faz com que o item selecionado esteja sempre visível na lista
  useEffect(() => {
    const selectedOptionIndex = options?.findIndex(
      (opcao) => opcao.id === selectedOption,
    );
    const initialScrollOffset = selectedOptionIndex * ITEM_SIZE - offset;
    virtualizer.scrollToOffset(initialScrollOffset);
  }, [offset, options, selectedOption, virtualizer]);

  const virtualOptions = virtualizer.getVirtualItems();

  const handleSearch = useCallback(
    (search: string) => {
      setSearchInput(search);
      if (setSearching) {
        setSearching(search);
        setFilteredOptions(options);
      } else {
        setFilteredOptions(
          options.filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase() ?? []),
          ),
        );
      }
    },
    [options, setSearchInput, setSearching],
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  return (
    <Command onKeyDown={handleKeyDown} shouldFilter={false}>
      <CommandInput
        autoFocus
        onValueChange={handleSearch}
        placeholder={placeholder}
        value={searchInput}
      />
      <CommandEmpty>Nenhum registro :(</CommandEmpty>
      <CommandGroup
        onScroll={(e) => {
          e.stopPropagation();
        }}
        ref={parentRef}
        style={{
          height: `${height}px`,
          overflow: "auto",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <div
          style={{
            WebkitBorderRadius: "4px",
            height: `${virtualizer.getTotalSize()}px`,
            overflow: "auto",
            position: "relative",
            scrollbarColor: "#888 transparent",
            width: "100%",
          }}
        >
          {virtualOptions.map((virtualOption) => (
            <CommandItem
              className="flex w-full items-center justify-start"
              key={filteredOptions[virtualOption.index].id}
              onSelect={onSelectOption}
              style={{
                height: `${virtualOption.size}px`,
                left: 0,
                position: "absolute",
                top: 0,
                transform: `translateY(${virtualOption.start}px)`,
                width: "100%",
              }}
              value={filteredOptions[virtualOption.index].id}
            >
              <CheckCircle2
                className={cn(
                  "text-success mr-2 h-4 w-4",
                  selectedOption === filteredOptions[virtualOption.index].id
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-justify">
                {filteredOptions[virtualOption.index].label}
              </p>
            </CommandItem>
          ))}
        </div>
      </CommandGroup>
    </Command>
  );
};

export interface VirtualizedComboboxProps {
  autoFocus?: boolean;
  buttonClassName?: string;
  canBeEmpty?: boolean;
  disabled?: boolean;
  error?: string;
  height?: number;
  id?: string;
  infoText?: string;
  label?: string;
  loading?: boolean;
  onChange?: (value?: string) => void;
  onCreateNew?: () => void;
  onSearch?: () => void;
  options: Option[];
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  searching?: string;
  setSearching?: (value: string) => void;
  size?: "default" | "lg" | "sm";
  value?: null | string;
}

export const VirtualizedCombobox = forwardRef<
  HTMLButtonElement,
  VirtualizedComboboxProps
>(
  (
    {
      buttonClassName,
      canBeEmpty = true,
      disabled = false,
      error = "",
      height = 250,
      id = "",
      infoText = "",
      label = "",
      loading = false,
      onChange,
      onCreateNew,
      onSearch,
      options = [],
      placeholder = "Buscar itens...",
      readOnly = false,
      required = false,
      searching,
      setSearching,
      // autoFocus = false,
      size = "default",
      value = "",
    },
    ref,
  ) => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("" as string);

    // * Desabilita a criação de novos registros e a busca caso desativado
    if (disabled || readOnly) {
      onCreateNew = undefined;
      onSearch = undefined;
    }

    const handleSelectOption = (currentValue: string) => {
      setOpen(false);
      if (onChange) {
        onChange(currentValue);
      }
    };

    const handleClearSelection = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      event.stopPropagation(); // Impede a propagação do clique para o botão principal
      setOpen(false);
      setSearchInput("");
      if (setSearching) setSearching("");
      if (onChange) onChange(undefined);
    };

    // const buttonRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [triggerWidth, setTriggerWidth] = useState<number | undefined>();

    useEffect(() => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    }, []);

    // console.log("OPTIONS DENTRO DO VIRTUALCOMBOBOX", options);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <div className="flex flex-col gap-1">
          {label && (
            <div className="flex items-center">
              {infoText && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="text-info mr-1 size-3" />
                  </TooltipTrigger>
                  <TooltipContent>{infoText}</TooltipContent>
                </Tooltip>
              )}
              <Label
                className={cn(
                  error && "text-destructive",
                  "text-sm font-semibold",
                )}
                htmlFor={id}
              >
                {label}{" "}
                {required && <span className="text-destructive">*</span>}
              </Label>
            </div>
          )}

          <div className="group flex w-full items-center">
            <div className="flex overflow-hidden rounded-l-md group-focus-within:ring-1 group-focus-within:ring-ring">
              {onSearch && (
                <Button
                  className={cn(
                    "min-w-6 rounded-r-none border-r-[1px] border-border",
                    size === "sm" && "h-8 w-8",
                  )}
                  disabled={disabled || loading}
                  onClick={onSearch}
                  size="icon"
                  tabIndex={-1}
                  variant="default"
                >
                  <Search className="size-4" />
                </Button>
              )}
              {onCreateNew && (
                <Button
                  className={cn(
                    "min-w-6 rounded-l-none rounded-r-none",
                    size === "sm" && "h-8 w-8",
                    size === "lg" && "h-10 w-10",
                  )}
                  disabled={disabled || loading}
                  onClick={onCreateNew}
                  size="icon"
                  tabIndex={-1}
                  variant="default"
                >
                  <PlusCircle className="size-4" />
                </Button>
              )}
            </div>

            <PopoverTrigger asChild ref={ref}>
              <Button
                aria-expanded={open}
                className={cn(
                  "group w-full justify-between bg-card px-2 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 group-focus-within:ring-1 group-focus-within:ring-ring",
                  error && "border-destructive",
                  (onCreateNew || onSearch) && "rounded-l-none border-l-0",
                  readOnly && "pointer-events-none border-none shadow-none",
                  buttonClassName,
                )}
                disabled={disabled}
                id={id}
                loading={loading}
                // ref={buttonRef}
                ref={triggerRef}
                role="combobox"
                size={size}
                variant="outline"
              >
                {value && (
                  <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal">
                    {options.find((option) => option.id === value)?.label}
                  </p>
                )}

                {!value && !!options.length && !readOnly && (
                  <p
                    className={cn(
                      "focus overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-muted-foreground",
                      size === "sm" && "text-xs",
                    )}
                  >
                    Selecione um registro...
                  </p>
                )}

                {readOnly && !value && <p className="font-bold">-</p>}

                {!options.length && !readOnly && (
                  <p
                    className={cn(
                      "overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-muted-foreground",
                      size === "sm" && "text-xs",
                    )}
                  >
                    Nenhum registro...
                  </p>
                )}

                <div className="flex items-center">
                  {value && !readOnly && canBeEmpty && (
                    <span
                      className="hidden group-hover:block group-hover:disabled:hidden"
                      role="button"
                      aria-label="Clear selection"
                      onClick={handleClearSelection}
                      tabIndex={-1}
                    >
                      <XCircle className="ml-2 size-4 shrink-0 opacity-80 hover:scale-110 hover:text-destructive hover:opacity-100" />
                    </span>
                  )}

                  {!readOnly && (
                    <ChevronsUpDown className="ml-2 size-3 shrink-0 opacity-80 hover:scale-110 hover:opacity-100" />
                  )}
                </div>
              </Button>
            </PopoverTrigger>
          </div>

          {!!error && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {error}
            </p>
          )}
        </div>

        <PopoverContent
          // className="w-[100px] p-0 sm:w-[200px] md:w-[600px] lg:w-[700px] xl:w-[800px]"
          className="pointer-events-auto z-50 p-0"
          side="bottom"
          align="start"
          avoidCollisions={false}
          style={{ minWidth: triggerWidth }}
          onScroll={(e) => {
            e.stopPropagation();
          }}
        >
          <VirtualizedCommand
            height={height}
            onSelectOption={handleSelectOption}
            options={options}
            placeholder={placeholder}
            searchInput={searchInput}
            searching={searching}
            selectedOption={value || ""}
            setSearchInput={setSearchInput}
            setSearching={setSearching}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

VirtualizedCombobox.displayName = "VirtualizedCombobox";
