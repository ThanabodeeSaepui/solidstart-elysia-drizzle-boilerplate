import { createSignal, Show } from "solid-js";
import FormInput from "~/components/FormInput";
import { authClient } from "~/lib/auth-client";
import { validateEmail, validatePassword } from "~/lib/validation";

interface SignInFormProps {
  onSwitchToSignUp?: () => void;
  onSuccess?: () => void;
}

export default function SignInForm(props: SignInFormProps) {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [emailError, setEmailError] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");
  const [submitError, setSubmitError] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email()));
  };

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password()));
  };

  const handleEmailInput = (value: string) => {
    setEmail(value);
    if (emailError()) setEmailError("");
    if (submitError()) setSubmitError("");
  };

  const handlePasswordInput = (value: string) => {
    setPassword(value);
    if (passwordError()) setPasswordError("");
    if (submitError()) setSubmitError("");
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
    setSubmitError("");

    try {
      await authClient.signIn.email(
        {
          email: email(),
          password: password(),
        },
        {
          onSuccess: () => {
            if (props.onSuccess) {
              props.onSuccess();
            } else {
              window.location.href = "/dashboard";
            }
          },
          onError: (error) => {
            setSubmitError(error.error.message || "Failed to sign in");
          },
        },
      );
    } catch (_error) {
      setSubmitError("An unexpected error occurred");
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
    <div class="mx-auto w-full max-w-md p-6">
      <h1 class="mb-6 text-center text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
        Welcome Back
      </h1>

      <form onSubmit={handleSubmit} class="space-y-4">
        <Show when={submitError()}>
          <div class="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {submitError()}
          </div>
        </Show>

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={email()}
          placeholder="Enter your email"
          error={emailError()}
          onInput={handleEmailInput}
          onBlur={handleEmailBlur}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={password()}
          placeholder="Enter your password"
          error={passwordError()}
          onInput={handlePasswordInput}
          onBlur={handlePasswordBlur}
        />

        <button
          type="submit"
          class="w-full rounded-lg font-medium py-3 px-6 transition-all focus:outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800 disabled:cursor-not-allowed disabled:opacity-50 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white dark:bg-sky-500 dark:hover:bg-sky-600 dark:active:bg-sky-700 disabled:bg-slate-400 disabled:hover:bg-slate-400"
          disabled={!canSubmit()}
        >
          {isSubmitting() ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <Show when={props.onSwitchToSignUp}>
        <div class="mt-6 text-center">
          <button
            type="button"
            onClick={props.onSwitchToSignUp}
            class="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors font-medium"
          >
            Need an account? Sign Up
          </button>
        </div>
      </Show>
    </div>
  );
}
