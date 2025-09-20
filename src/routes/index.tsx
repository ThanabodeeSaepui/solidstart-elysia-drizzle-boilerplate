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
  const [todos, { mutate: mutateTodos, refetch }] = createResource(
    refreshTrigger,
    async () => {
      try {
        const response = await api.todo.get();
        return response.data || [];
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        return [];
      }
    },
  );

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
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <Counter />

      {/* Loading state */}
      <Show when={todos.loading}>
        <div>Loading todos...</div>
      </Show>

      {/* Error state */}
      <Show when={todos.error}>
        <div>Error loading todos</div>
      </Show>

      {/* Todo list */}
      <Show when={todos() && !todos.loading}>
        <For each={todos()}>
          {(todoItem) => (
            <div class="mb-2">
              <Todo todo={todoItem} onDelete={deleteTodo} />
            </div>
          )}
        </For>
      </Show>

      {/* Add todo form */}
      <div class="flex flex-row justify-center gap-4">
        <input
          class="rounded border-2 border-black px-2 py-1"
          type="text"
          value={todo.description || ""}
          onInput={(e) => setTodo("description", e.currentTarget.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter" && Check(todoInsertSchema, { ...todo })) {
              addTodo();
            }
          }}
        />
        <button
          class="rounded border-2 border-black bg-gray-300 px-4 transition-all hover:bg-gray-400 active:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={!Check(todoInsertSchema, { ...todo })}
          onClick={addTodo}
        >
          Submit
        </button>
      </div>

      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>
      </p>
    </main>
  );
}
