"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlState } from "@/hooks/use-url-state";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  param?: string;
  placeholder?: string;
  type?: "search" | "text" | "number";
  icon?: ReactNode;
  className?: string;
}

// Debounced input that writes its value to the URL (?param=value)
export function SearchInput({ param = "q", placeholder = "Search…", type = "search", icon, className }: SearchInputProps) {
  const { searchParams, update } = useUrlState();
  const current = searchParams.get(param) ?? "";
  const [value, setValue] = useState(current);
  const debounced = useDebounce(value);

  useEffect(() => {
    if (debounced !== current) update({ [param]: debounced });
    // only react to the debounced value, not to URL changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div className={cn("relative", className)}>
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
      )}
      <Input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        min={type === "number" ? 0 : undefined}
        className={icon ? "pl-9" : undefined}
      />
    </div>
  );
}