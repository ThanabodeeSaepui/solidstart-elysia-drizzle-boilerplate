import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import SignInForm from "~/components/auth/SignInForm";
import { useSession } from "~/lib/auth-client";

export default function LoginPage() {
  const navigate = useNavigate();
  const session = useSession();

  createEffect(() => {
    if (session().data) {
      navigate("/dashboard", { replace: true });
    }
  });

  return (
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div class="w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <SignInForm
          onSwitchToSignUp={() => navigate("/signup")}
          onSuccess={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
}
