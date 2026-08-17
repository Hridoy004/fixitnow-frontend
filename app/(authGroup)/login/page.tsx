import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card/80 p-8 shadow-xl backdrop-blur-sm">
          {/* LOGO / BRAND */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <span className="text-lg font-bold">F</span>
            </div>
          </div>

          {/* FORM GENERIC TEXTS */}
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          {/* FORM */}
          <LoginForm />

          {/* FOOTER LINK */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
