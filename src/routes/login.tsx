import { useNavigate } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { authClient } from "~/lib/auth-client";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [emailError, setEmailError] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const validateEmail = (value: string): string => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email address";
    return "";
  };

  const validatePassword = (value: string): string => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email()));
  };

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password()));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    // Validate all fields
    const emailErr = validateEmail(email());
    const passwordErr = validatePassword(password());

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    // If there are validation errors, don't submit
    if (emailErr || passwordErr) {
      return;
    }

    setIsSubmitting(true);

    try {
      await authClient.signIn.email(
        {
          email: email(),
          password: password(),
        },
        {
          onSuccess: () => {
            navigate("/dashboard");
            console.log("Sign in successful");
          },
          onError: (error) => {
            console.error(error.error.message);
          },
        },
      );
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = () => {
    return (
      email() &&
      password() &&
      !emailError() &&
      !passwordError() &&
      !isSubmitting()
    );
  };

  return (
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div class="mx-auto w-full max-w-md p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <h1 class="mb-6 text-center text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <div class="space-y-2">
              <label
                for="email"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email()}
                onBlur={handleEmailBlur}
                onInput={(e) => {
                  setEmail(e.currentTarget.value);
                  // Clear error when user starts typing
                  if (emailError()) setEmailError("");
                }}
                class="w-full rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-4 py-3 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800 focus:outline-none transition-all placeholder-slate-500 dark:placeholder-slate-400"
                placeholder="Enter your email"
              />
              <Show when={emailError()}>
                <p class="text-sm text-red-600 dark:text-red-400">
                  {emailError()}
                </p>
              </Show>
            </div>
          </div>

          <div>
            <div class="space-y-2">
              <label
                for="password"
                class="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password()}
                onBlur={handlePasswordBlur}
                onInput={(e) => {
                  setPassword(e.currentTarget.value);
                  // Clear error when user starts typing
                  if (passwordError()) setPasswordError("");
                }}
                class="w-full rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-4 py-3 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800 focus:outline-none transition-all placeholder-slate-500 dark:placeholder-slate-400"
                placeholder="Enter your password"
              />
              <Show when={passwordError()}>
                <p class="text-sm text-red-600 dark:text-red-400">
                  {passwordError()}
                </p>
              </Show>
            </div>
          </div>

          <button
            type="submit"
            class="w-full rounded-lg font-medium py-3 px-6 transition-all focus:outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800 disabled:cursor-not-allowed disabled:opacity-50
							   bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white
							   dark:bg-sky-500 dark:hover:bg-sky-600 dark:active:bg-sky-700
							   disabled:bg-slate-400 disabled:hover:bg-slate-400"
            disabled={!canSubmit()}
          >
            {isSubmitting() ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div class="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            class="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors font-medium"
          >
            Need an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
