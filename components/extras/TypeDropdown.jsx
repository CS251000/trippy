"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { tripTypesMap } from "@/lib/constants"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function TypeComboBox({ value, onChange }) {
  const [open, setOpen] = useState(false)
  
  // Renamed the internal state to avoid conflict with the `value` prop
  const [internalValue, setInternalValue] = useState(value)

  React.useEffect(() => {
    setInternalValue(value) // Sync internal state with the external `value` prop
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-gray-200"
        >
          {internalValue
            ? tripTypesMap.find((triptype) => triptype.value === internalValue)?.label
            : "Select Type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0"
        style={{ position: "absolute", top: "100%", left: 0, zIndex: 10 }}
      >
        <Command>
          <CommandInput placeholder="Select Type..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Type found.</CommandEmpty>
            <CommandGroup>
              {tripTypesMap.map((triptype) => (
                <CommandItem
                  key={triptype.value}
                  value={triptype.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === internalValue ? "" : currentValue);
                    setInternalValue(currentValue === internalValue ? "" : currentValue); // Sync internal state with selected value
                    setOpen(false);
                  }}
                >
                  {triptype.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      internalValue === triptype.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
