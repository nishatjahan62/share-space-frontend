import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthCard, OrDivider } from "@/components/forms/auth-card";
import { DemoLogin } from "@/components/forms/demo-login";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your ShareSpace account, or try a one-click demo as an admin, tenant or owner.",
};

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back 👋" description="Login to your account">
      <Suspense>
        <LoginForm />
      </Suspense>
      <OrDivider />
      <Suspense>
        <DemoLogin />
      </Suspense>
      <p className="text-center text-sm text-muted-foreground">
        New to ShareSpace?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}