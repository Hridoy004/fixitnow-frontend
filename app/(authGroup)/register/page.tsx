import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
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
              Create an Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to get started
            </p>
          </div>

          {/* FORM */}
          <RegisterForm />

          {/* FOOTER LINK */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
