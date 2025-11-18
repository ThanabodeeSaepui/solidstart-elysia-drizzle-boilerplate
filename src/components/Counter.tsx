import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="flex flex-col items-center space-y-2">
      <button
        class="group relative w-48 h-16 rounded-xl font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-800 overflow-hidden
               bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 
               dark:from-sky-600 dark:to-blue-700 dark:hover:from-sky-700 dark:hover:to-blue-800
               text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
        onClick={() => setCount(count() + 1)}
      >
        <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <span class="relative z-10 flex items-center justify-center gap-2">
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-label="increment"
          >
            \n <title>Increment</title>\n{" "}
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Clicks: {count()}
        </span>
      </button>

      <p class="text-sm text-slate-600 dark:text-slate-400 font-medium">
        Click the button to increment!
      </p>
    </div>
  );
}
