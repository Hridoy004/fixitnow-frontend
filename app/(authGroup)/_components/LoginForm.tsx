"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { loginAction } from "../_actions/authActions";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false,
  );

  useEffect(() => {
    if (!state) return;

    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-5">
      {/* EMAIL */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="border-border pl-9"
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <a
            href="/forgot-password"
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="border-border pl-9 pr-9"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* SUBMIT */}
      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-primary font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
