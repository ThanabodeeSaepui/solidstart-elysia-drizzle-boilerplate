import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 transition-colors duration-200">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-8xl font-thin uppercase my-16 bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
          404
        </h1>
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Page Not Found
          </h2>
          <p class="text-slate-600 dark:text-slate-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <A
            href="/"
            class="inline-block px-6 py-3 rounded-lg font-medium transition-all bg-sky-600 hover:bg-sky-700 text-white dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            Go Home
          </A>
        </div>
        <p class="my-8 text-slate-600 dark:text-slate-400">
          <A
            href="/"
            class="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors font-medium"
          >
            Home
          </A>
          {" - "}
          <A
            href="/about"
            class="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors font-medium"
          >
            About Page
          </A>
        </p>
      </div>
    </main>
  );
}
