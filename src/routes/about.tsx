import { A } from "@solidjs/router";

export default function About() {
  return (
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 transition-colors duration-200">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-6xl font-thin uppercase my-16 text-center bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
          About Page
        </h1>
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            This is a boilerplate project built with{" "}
            <span class="font-medium text-slate-900 dark:text-slate-100">
              SolidStart
            </span>
            ,{" "}
            <span class="font-medium text-slate-900 dark:text-slate-100">
              ElysiaJS
            </span>
            , and{" "}
            <span class="font-medium text-slate-900 dark:text-slate-100">
              Drizzle ORM
            </span>
            . It provides a solid foundation for building full-stack TypeScript
            applications with authentication, database integration, and a modern
            development experience.
          </p>
          <p class="mt-4 text-slate-600 dark:text-slate-400">
            Visit{" "}
            <a
              href="https://solidjs.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline font-medium transition-colors"
            >
              solidjs.com
            </a>{" "}
            to learn how to build Solid apps.
          </p>
        </div>
        <p class="my-8 text-center text-slate-600 dark:text-slate-400">
          <A
            href="/"
            class="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors font-medium"
          >
            Home
          </A>
          {" - "}
          <span class="font-medium">About Page</span>
        </p>
      </div>
    </main>
  );
}
