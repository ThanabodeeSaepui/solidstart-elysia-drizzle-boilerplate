import { Check, Create } from "@sinclair/typebox/value";
import { A } from "@solidjs/router";
import { useMutation, useQuery } from "@tanstack/solid-query";
import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { api } from "~/app";
import Counter from "~/components/Counter";
import Todo from "~/components/Todo";
import { todoInsertSchema, todoSchemas } from "~/database/schema/todos";

export default function Home() {
  const [todo, setTodo] = createStore(Create(todoInsertSchema));

  const todoQuery = useQuery(() => ({
    queryKey: ["todo"],
    queryFn: async () => (await api.todo.get()).data!,
  }));

  const todoAdd = useMutation(() => ({
    mutationFn: async () => await api.todo.post(todo),
    onSuccess: () => setTodo(Create(todoInsertSchema)),
  }));

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <Counter />
      <Show when={todoQuery.data}>
        {(todoList) => (
          <For each={todoList()}>
            {(todo) => (
              <div class={"mb-2"}>
                <Todo todo={todo} />
              </div>
            )}
          </For>
        )}
      </Show>
      <div class={"flex flex-row justify-center gap-4"}>
        <input
          class={"rounded border-2 border-black px-2 py-1"}
          type={"text"}
          value={todo.description}
          onInput={({ currentTarget: { value: description } }) =>
            setTodo("description", description)
          }
          onKeyUp={({ key }) => {
            if (
              key === "Enter" &&
              !todoAdd.isPending &&
              Check(todoInsertSchema, { ...todo })
            )
              todoAdd.mutate();
          }}
        />
        <button
          class={
            "rounded border-2 border-black bg-gray-300 px-4 transition-all hover:bg-gray-400 active:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400"
          }
          disabled={todoAdd.isPending || !Check(todoInsertSchema, { ...todo })}
          onClick={() => todoAdd.mutate()}
        >
          Submit
        </button>
      </div>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p>
    </main>
  );
}
