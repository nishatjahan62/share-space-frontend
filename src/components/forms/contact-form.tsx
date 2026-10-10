"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { clientFetch } from "@/lib/client-api";
import { contactSchema, type ContactInput } from "@/lib/schemas";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: (values: ContactInput) =>
      clientFetch("/contact", {
        method: "POST",
        body: values,
      }),

    onSuccess: () => {
      toast.success("Message sent. We'll get back to you soon.");
      reset();
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="space-y-4"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Your name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <TextField
        label="Subject"
        error={errors.subject?.message}
        {...register("subject")}
      />

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>

        <Textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "message-error" : undefined
          }
          {...register("message")}
        />

        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Send />
        )}
        Send message
      </Button>
    </form>
  );
}
