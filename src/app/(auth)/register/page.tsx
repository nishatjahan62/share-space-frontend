import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthCard } from "@/components/forms/auth-card";
import { RegisterForm } from "@/components/forms/register-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Join ShareSpace as a tenant looking for a room or an owner listing property.",
};

export default function RegisterPage() {
  return (
    <AuthCard title="Create your account" description="Start finding rooms or listing your property">
      <Suspense>
        <RegisterForm />
      </Suspense>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}