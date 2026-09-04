"use client";

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

import { Eye, EyeOff, Github, Loader2, Lock, Mail } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isPending =
    form.formState.isSubmitting || isGoogleLoading || isGithubLoading;

  const onSubmit = async (values: LoginFormValues) => {
    try {
      form.clearErrors("root");

      const signInResult = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      });

      if (signInResult?.error) {
        throw new Error(signInResult.error.message || "Invalid credentials.");
      }

      toast.success("Logged in successfully!");

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      const errorMessage =
        err?.message || "Invalid email or password combination.";

      const lowerError = errorMessage.toLowerCase();

      if (lowerError.includes("email")) {
        form.setError("email", {
          type: "server",
          message: errorMessage,
        });
      } else if (lowerError.includes("password")) {
        form.setError("password", {
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

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      toast.error("Google sign-in failed");
      setIsGoogleLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsGithubLoading(true);

      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      toast.error("GitHub sign-in failed");
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-muted/70 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-1 text-center sm:text-left sm:pb-6">
          <CardTitle className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            Welcome back
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground">
            Enter your credentials below to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Google Sign In */}
              <Button
                variant="outline"
                type="button"
                disabled={isPending}
                onClick={handleGoogleSignIn}
                className="h-10 w-full font-medium transition-all"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting to Google...
                  </>
                ) : (
                  "Continue with Google"
                )}
              </Button>

              {/* GitHub Sign In */}
              <Button
                variant="outline"
                type="button"
                disabled={isPending}
                onClick={handleGithubSignIn}
                className="h-10 w-full font-medium transition-all"
              >
                {isGithubLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting to GitHub...
                  </>
                ) : (
                  <>
                    <Github className="mr-2 h-4 w-4" />
                    Continue with GitHub
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

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
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Sign Up Link */}
              <div className="pt-2 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signUp"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Create an account
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
