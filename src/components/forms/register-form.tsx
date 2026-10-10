"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/forms/text-field";
import { useRegister } from "@/hooks/use-auth";
import { registerSchema, type RegisterInput } from "@/lib/schemas";

const ROLE_OPTIONS = [
  { value: "TENANT", title: "I'm looking for a room", hint: "Tenant account" },
  { value: "OWNER", title: "I own property", hint: "Owner account" },
] as const;

export function RegisterForm() {
  const signUp = useRegister();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "TENANT" },
  });

  const onSubmit = ({ name, email, password, role }: RegisterInput) => signUp.mutate({ name, email, password, role });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <fieldset className="grid grid-cols-2 gap-3">
        <legend className="sr-only">Account type</legend>
        {ROLE_OPTIONS.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input type="radio" value={option.value} className="peer sr-only" {...register("role")} />
            <div className="rounded-lg border p-3 text-sm transition-colors peer-checked:border-primary peer-checked:bg-primary/5 peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
              <p className="font-medium">{option.title}</p>
              <p className="text-muted-foreground">{option.hint}</p>
            </div>
          </label>
        ))}
      </fieldset>
      <TextField label="Full name" autoComplete="name" error={errors.name?.message} {...register("name")} />
      <TextField label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <TextField
        label="Password"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <TextField
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" className="w-full" disabled={signUp.isPending}>
        {signUp.isPending ? <Loader2 className="animate-spin" /> : <UserPlus />} Create account
      </Button>
    </form>
  );
}