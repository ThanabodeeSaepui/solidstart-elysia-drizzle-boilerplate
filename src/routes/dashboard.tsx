import { createSignal, Show } from "solid-js";
import TodoForm from "~/components/TodoForm";
import TodoList from "~/components/TodoList";
import { useSession } from "~/lib/auth-client";

export default function DashboardPage() {
  const session = useSession();
  const [refreshKey, setRefreshKey] = createSignal(0);
  const refreshTodos = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-8 transition-colors duration-200">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
          Dashboard
        </h1>
        <Show when={session().data}>
          <div class="space-y-6">
            <TodoForm onCreated={refreshTodos} />
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Your Todos
              </h2>
              <TodoList refreshKey={refreshKey} onRefresh={refreshTodos} />
            </div>
          </div>
        </Show>
        <Show when={!session().data}>
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 text-center">
            <p class="text-slate-600 dark:text-slate-400">
              Please{" "}
              <a
                href="/login"
                class="text-sky-600 dark:text-sky-400 hover:underline font-medium"
              >
                log in
              </a>{" "}
              to manage your todos.
            </p>
          </div>
        </Show>
      </div>
    </div>
  );
}
