import { useLocation, useNavigate } from "@solidjs/router";
import { Show, createEffect } from "solid-js";
import { authClient, useSession } from "~/lib/auth-client";

export default function Nav() {
  const location = useLocation();
  const session = useSession();
  const navigate = useNavigate();

  createEffect(() => {
    console.log("Session data changed:", session().data);
  });

  const active = (path: string) =>
    path === location.pathname
      ? "border-sky-400 text-white bg-sky-700/50"
      : "border-transparent text-slate-200 hover:border-sky-400 hover:text-white hover:bg-sky-700/30";

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav class="bg-sky-900 dark:bg-slate-900 shadow-lg border-b border-sky-800 dark:border-slate-700">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-4">
          <ul class="flex items-center">
            <li
              class={`border-b-2 ${active("/")} mx-2 sm:mx-4 transition-all duration-200 rounded-t-md`}
            >
              <a
                href="/"
                class="block px-4 py-2 font-medium transition-all duration-200 rounded-md"
              >
                Home
              </a>
            </li>
            <li
              class={`border-b-2 ${active("/about")} mx-2 sm:mx-4 transition-all duration-200 rounded-t-md`}
            >
              <a
                href="/about"
                class="block px-4 py-2 font-medium transition-all duration-200 rounded-md"
              >
                About
              </a>
            </li>
          </ul>
          <ul class="flex items-center">
            <Show
              when={session().data}
              fallback={
                <>
                  <li
                    class={`border-b-2 ${active(
                      "/login",
                    )} sm:mx-4 transition-all duration-200 rounded-t-md`}
                  >
                    <a
                      href="/login"
                      class="block px-4 py-2 font-medium transition-all duration-200 rounded-md"
                    >
                      Login
                    </a>
                  </li>
                  <li
                    class={`border-b-2 ${active(
                      "/signup",
                    )} mx-2 sm:mx-4 transition-all duration-200 rounded-t-md`}
                  >
                    <a
                      href="/signup"
                      class="block px-4 py-2 font-medium transition-all duration-200 rounded-md"
                    >
                      Sign Up
                    </a>
                  </li>
                </>
              }
            >
              <li
                class={`border-b-2 ${active(
                  "/dashboard",
                )} sm:mx-4 transition-all duration-200 rounded-t-md`}
              >
                <a
                  href="/dashboard"
                  class="block px-4 py-2 font-medium transition-all duration-200 rounded-md"
                >
                  Dashboard
                </a>
              </li>
              <li
                class={`border-b-2 border-transparent mx-2 sm:mx-4 transition-all duration-200 rounded-t-md`}
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  class="block px-4 py-2 font-medium transition-all duration-200 rounded-md text-slate-200 hover:border-sky-400 hover:text-white hover:bg-sky-700/30"
                >
                  Logout
                </button>
              </li>
            </Show>
          </ul>
        </div>
      </div>
    </nav>
  );
}
