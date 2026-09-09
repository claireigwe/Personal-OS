"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AuthActionState } from "./actions";

type AuthFormProps = {
  mode: "login" | "signup";
  action: (state: AuthActionState, formData: FormData) => Promise<AuthActionState>;
};

export function AuthForm({ mode, action }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [fieldErrors, setFieldErrors] = useState<{name?: string, email?: string, password?: string}>({});
  const isSignup = mode === "signup";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const newErrors: typeof fieldErrors = {};

    if (isSignup) {
      if (!formData.get("name")?.toString().trim()) {
        newErrors.name = "Name is required.";
      }
    }
    
    const email = formData.get("email")?.toString().trim();
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }

    const password = formData.get("password")?.toString();
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setFieldErrors(newErrors);
    } else {
      setFieldErrors({});
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="grid gap-4">
      {isSignup ? (
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            name="name" 
            autoComplete="name" 
            className={fieldErrors.name ? "border-red-500 focus-visible:ring-red-500/20" : ""}
            onChange={() => setFieldErrors(prev => ({...prev, name: undefined}))}
          />
          {fieldErrors.name && <p className="text-sm font-semibold text-red-500 animate-fade-in">{fieldErrors.name}</p>}
        </div>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          autoComplete="email" 
          className={fieldErrors.email ? "border-red-500 focus-visible:ring-red-500/20" : ""}
          onChange={() => setFieldErrors(prev => ({...prev, email: undefined}))}
        />
        {fieldErrors.email && <p className="text-sm font-semibold text-red-500 animate-fade-in">{fieldErrors.email}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          className={fieldErrors.password ? "border-red-500 focus-visible:ring-red-500/20" : ""}
          onChange={() => setFieldErrors(prev => ({...prev, password: undefined}))}
        />
        {fieldErrors.password && <p className="text-sm font-semibold text-red-500 animate-fade-in">{fieldErrors.password}</p>}
      </div>
      {state.error ? <p className="text-sm font-semibold text-red-500 animate-fade-in">{state.error}</p> : null}
      <Button disabled={pending}>{isSignup ? "Create account" : "Log in"}</Button>
      <p className="text-center text-sm font-medium text-muted-foreground">
        {isSignup ? "Already have an account?" : "New to Personal OS?"}{" "}
        <Link className="text-primary underline-offset-4 hover:underline" href={isSignup ? "/login" : "/signup"}>
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
