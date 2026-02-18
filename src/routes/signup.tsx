import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import SignUpForm from "~/components/auth/SignUpForm";
import { useSession } from "~/lib/auth-client";

export default function SignupPage() {
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
        <SignUpForm
          onSwitchToSignIn={() => navigate("/login")}
          onSuccess={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
}
