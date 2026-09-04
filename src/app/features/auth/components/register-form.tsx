"use client";

import * as React from "react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";

import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";

// Validation Schema
const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      form.clearErrors("root");

      const { data, error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Sign up failed.");
      }

      toast.success("Account created successfully!");

      router.push("/");
      router.refresh();
    } catch (err: any) {
      const errorMessage = err?.message || "Something went wrong.";
      const lowerError = errorMessage.toLowerCase();

      if (
        lowerError.includes("email") ||
        lowerError.includes("user already exists") ||
        lowerError.includes("already exists")
      ) {
        form.setError("email", {
          type: "server",
          message: errorMessage,
        });
      } else if (lowerError.includes("password")) {
        form.setError("password", {
          type: "server",
          message: errorMessage,
        });
      } else if (lowerError.includes("name")) {
        form.setError("name", {
          type: "server",
          message: errorMessage,
        });
      } else {
        form.setError("root", {
          type: "server",
          message: errorMessage,
        });
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-muted/70 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-1 text-center sm:text-left sm:pb-6">
          <CardTitle className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            Create an account
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground">
            Enter your details below to get started with your new profile
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                      Full Name
                    </FormLabel>

                    <FormControl>
                      <div className="relative flex items-center">
                        <User className="absolute left-3 h-4 w-4 text-muted-foreground/60" />

                        <Input
                          placeholder="John Doe"
                          disabled={isPending}
                          className="h-10 pl-9 transition-all focus-visible:ring-ring"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                      Email Address
                    </FormLabel>

                    <FormControl>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 h-4 w-4 text-muted-foreground/60" />

                        <Input
                          type="email"
                          placeholder="name@example.com"
                          disabled={isPending}
                          className="h-10 pl-9 transition-all focus-visible:ring-ring"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                      Password
                    </FormLabel>

                    <FormControl>
                      <div className="relative flex items-center">
                        <Lock className="absolute left-3 h-4 w-4 text-muted-foreground/60" />

                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          disabled={isPending}
                          className="h-10 pl-9 pr-10 transition-all focus-visible:ring-ring"
                          {...field}
                        />

                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute right-3 text-muted-foreground/60 transition-colors hover:text-foreground focus:outline-none disabled:cursor-not-allowed"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                      Confirm Password
                    </FormLabel>

                    <FormControl>
                      <div className="relative flex items-center">
                        <Lock className="absolute left-3 h-4 w-4 text-muted-foreground/60" />

                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          disabled={isPending}
                          className="h-10 pl-9 pr-10 transition-all focus-visible:ring-ring"
                          {...field}
                        />

                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() =>
                            setShowConfirmPassword((previous) => !previous)
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                          className="absolute right-3 text-muted-foreground/60 transition-colors hover:text-foreground focus:outline-none disabled:cursor-not-allowed"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />

              {/* General Server Error */}
              {form.formState.errors.root && (
                <div
                  className="animate-in fade-in-50 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-center text-xs font-semibold text-destructive duration-150"
                  role="alert"
                >
                  {form.formState.errors.root.message}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 w-full font-semibold transition-all"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>

              {/* Login Link */}
              <div className="pt-2 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
