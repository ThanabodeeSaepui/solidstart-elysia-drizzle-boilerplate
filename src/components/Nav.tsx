import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path === location.pathname
      ? "border-sky-400 text-white bg-sky-700/50"
      : "border-transparent text-slate-200 hover:border-sky-400 hover:text-white hover:bg-sky-700/30";

  return (
    <nav class="bg-sky-900 dark:bg-slate-900 shadow-lg border-b border-sky-800 dark:border-slate-700">
      <div class="container mx-auto px-4">
        <ul class="flex items-center py-4">
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
      </div>
    </nav>
  );
}
