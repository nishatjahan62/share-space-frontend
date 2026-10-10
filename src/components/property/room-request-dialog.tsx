"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { clientFetch } from "@/lib/client-api";

const MODES = {
  viewing: {
    trigger: "Request viewing",
    title: "Request a viewing",
    description:
      "Pick a date and time. The owner will confirm or suggest another slot.",
    dateLabel: "Preferred date and time",
    inputType: "datetime-local",
    endpoint: "/viewing-requests",
    dateKey: "requestedDate",
    success: "Viewing request sent",
    withMessage: false,
    variant: "outline",
  },
  application: {
    trigger: "Apply for this room",
    title: "Apply for this room",
    description:
      "Tell the owner when you'd like to move in. They'll review your application.",
    dateLabel: "Move-in date",
    inputType: "date",
    endpoint: "/applications",
    dateKey: "moveInDate",
    success: "Application submitted",
    withMessage: true,
    variant: "default",
  },
} as const;

const schema = z.object({
  date: z
    .string()
    .min(1, "Please choose a date")
    .refine(
      (value) => new Date(value).getTime() > Date.now(),
      "Choose a date in the future"
    ),
  message: z.string().max(500, "Keep it under 500 characters").optional(),
});

type FormValues = z.infer<typeof schema>;

interface RoomRequestDialogProps {
  mode: keyof typeof MODES;
  roomId: string;
  disabled?: boolean;
}

export function RoomRequestDialog({
  mode,
  roomId,
  disabled,
}: RoomRequestDialogProps) {
  const config = MODES[mode];
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: ({ date, message }: FormValues) =>
      clientFetch(config.endpoint, {
        method: "POST",
        body: {
          roomId,
          [config.dateKey]: new Date(date).toISOString(),
          ...(config.withMessage && message ? { message } : {}),
        },
      }),
    onSuccess: () => {
      toast.success(config.success);
      setOpen(false);
      reset();
      router.refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <>
      <Button
        type="button"
        variant={config.variant}
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        {config.trigger}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form
            onSubmit={handleSubmit((values) => mutation.mutate(values))}
            className="space-y-4"
            noValidate
          >
            <DialogHeader>
              <DialogTitle>{config.title}</DialogTitle>
              <DialogDescription>
                {config.description}
              </DialogDescription>
            </DialogHeader>

            <TextField
              label={config.dateLabel}
              type={config.inputType}
              error={errors.date?.message}
              {...register("date")}
            />

            {config.withMessage && (
              <div className="space-y-2">
                <Label htmlFor="message">
                  Message to the owner (optional)
                </Label>

                <Textarea
                  id="message"
                  rows={3}
                  {...register("message")}
                />

                {errors.message && (
                  <p role="alert" className="text-sm text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>
            )}

            <DialogFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}