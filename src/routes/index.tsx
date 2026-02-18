import { Check, Create } from "@sinclair/typebox/value";
import { A } from "@solidjs/router";
import { createResource, createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { api } from "~/app";
import Counter from "~/components/Counter";
import Todo from "~/components/Todo";
import { todoInsertSchema } from "~/database/schema/todos";

export default function Home() {
  const [todo, setTodo] = createStore(Create(todoInsertSchema));
  const [refreshTrigger, setRefreshTrigger] = createSignal(0);

  // Replace useQuery with createResource
  const [todos] = createResource(refreshTrigger, async () => {
    try {
      const response = await api.todo.get();
      return response.data || [];
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      return [];
    }
  });

  const addTodo = async () => {
    if (!Check(todoInsertSchema, { ...todo })) return;

    try {
      await api.todo.post(todo);
      setTodo(Create(todoInsertSchema));
      // Trigger refetch by updating the signal
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await api.todo({ id }).delete();
      // Trigger refetch
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <main class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 transition-colors duration-200">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-6xl font-thin uppercase my-16 text-center bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
          Hello world!
        </h1>

        <div class="mb-8">
          <Counter />
        </div>

        {/* Loading state */}
        <Show when={todos.loading}>
          <div class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 dark:border-sky-400"></div>
            <p class="mt-2 text-slate-600 dark:text-slate-400">
              Loading todos...
            </p>
          </div>
        </Show>

        {/* Error state */}
        <Show when={todos.error}>
          <div class="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            Error loading todos
          </div>
        </Show>

        {/* Todo list */}
        <Show when={todos() && !todos.loading}>
          <div class="space-y-3 mb-8">
            <For each={todos()}>
              {(todoItem) => <Todo todo={todoItem} onDelete={deleteTodo} />}
            </For>
          </div>
        </Show>

        {/* Add todo form */}
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
          <div class="flex flex-col sm:flex-row gap-4">
            <input
              class="flex-1 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-4 py-2 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800 focus:outline-none transition-all placeholder-slate-500 dark:placeholder-slate-400"
              type="text"
              placeholder="Add a new todo..."
              value={todo.description || ""}
              onInput={(e) => setTodo("description", e.currentTarget.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter" && Check(todoInsertSchema, { ...todo })) {
                  addTodo();
                }
              }}
            />
            <button
              type="button"
              class="px-6 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800 disabled:cursor-not-allowed disabled:opacity-50
                     bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white
                     dark:bg-sky-500 dark:hover:bg-sky-600 dark:active:bg-sky-700
                     disabled:bg-slate-400 disabled:hover:bg-slate-400"
              disabled={!Check(todoInsertSchema, { ...todo })}
              onClick={addTodo}
            >
              Add Todo
            </button>
          </div>
        </div>

        <p class="my-8 text-center text-slate-600 dark:text-slate-400">
          <span class="font-medium">Home</span>
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
