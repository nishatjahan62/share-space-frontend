"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUrlState } from "@/hooks/use-url-state";

interface SelectFilterProps {
  param: string;
  label: string;
  defaultValue: string;
  options: { value: string; label: string }[];
  className?: string;
}

// Dropdown bound to a URL param. The default value is kept out of the URL for clean links.
export function SelectFilter({ param, label, defaultValue, options, className }: SelectFilterProps) {
  const { searchParams, update } = useUrlState();
  const value = searchParams.get(param) ?? defaultValue;

  return (
    <Select value={value} onValueChange={(next) => update({ [param]: next === defaultValue ? undefined : next })}>
      <SelectTrigger className={className} aria-label={label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}