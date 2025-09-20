import { createSignal, Show } from "solid-js";
import { authClient } from "~/lib/auth-client";

export default function SignUpForm({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [nameError, setNameError] = createSignal("");
  const [emailError, setEmailError] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const validateName = (value: string): string => {
    if (!value) return "Name is required";
    if (value.length < 2) return "Name must be at least 2 characters";
    return "";
  };

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

  const handleNameBlur = () => {
    setNameError(validateName(name()));
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
    const nameErr = validateName(name());
    const emailErr = validateEmail(email());
    const passwordErr = validatePassword(password());

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    // If there are validation errors, don't submit
    if (nameErr || emailErr || passwordErr) {
      return;
    }

    setIsSubmitting(true);

    try {
      await authClient.signUp.email(
        {
          email: email(),
          password: password(),
          name: name(),
        },
        {
          onSuccess: () => {
            // Redirect to dashboard
            window.location.href = "/dashboard";
            console.log("Sign up successful");
          },
          onError: (error) => {
            console.error(error.error.message);
          },
        },
      );
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = () => {
    return (
      name() &&
      email() &&
      password() &&
      !nameError() &&
      !emailError() &&
      !passwordError() &&
      !isSubmitting()
    );
  };

  return (
    <div class="mx-auto w-full mt-10 max-w-md p-6">
      <h1 class="mb-6 text-center text-3xl font-bold">Create Account</h1>

      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <div class="space-y-2">
            <label for="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name()}
              onBlur={handleNameBlur}
              onInput={(e) => {
                setName(e.currentTarget.value);
                // Clear error when user starts typing
                if (nameError()) setNameError("");
              }}
              class="w-full rounded border p-2"
            />
            <Show when={nameError()}>
              <p class="text-sm text-red-600">{nameError()}</p>
            </Show>
          </div>
        </div>

        <div>
          <div class="space-y-2">
            <label for="email">Email</label>
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
              class="w-full rounded border p-2"
            />
            <Show when={emailError()}>
              <p class="text-sm text-red-600">{emailError()}</p>
            </Show>
          </div>
        </div>

        <div>
          <div class="space-y-2">
            <label for="password">Password</label>
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
              class="w-full rounded border p-2"
            />
            <Show when={passwordError()}>
              <p class="text-sm text-red-600">{passwordError()}</p>
            </Show>
          </div>
        </div>

        <button
          type="submit"
          class="w-full rounded bg-indigo-600 p-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          disabled={!canSubmit()}
        >
          {isSubmitting() ? "Submitting..." : "Sign Up"}
        </button>
      </form>

      <div class="mt-4 text-center">
        <button
          type="button"
          onClick={onSwitchToSignIn}
          class="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
}
