import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextFieldProps extends ComponentProps<typeof Input> {
  label: string;
  error?: string | undefined;
}

// Label + input + accessible error message, used by every form
export function TextField({ label, error, id, ...props }: TextFieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input id={fieldId} aria-invalid={!!error} aria-describedby={error ? `${fieldId}-error` : undefined} {...props} />
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}