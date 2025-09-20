import { useMutation } from "@tanstack/solid-query";
import { api } from "~/app";
import type { Todo as TodoType } from "~/database/schema/todos";

interface TodoProps {
  todo: TodoType;
}

export default function Todo(props: TodoProps) {
  const todoDelete = useMutation(() => ({
    mutationFn: async () => await api.todo({ id: props.todo.id }).delete(),
  }));
  return (
    <div class={"flex flex-row justify-center gap-4"}>
      <pre>{props.todo.description}</pre>
      <button
        class={
          "rounded-sm border-2 border-black bg-red-300 px-4 transition-all hover:bg-red-400 active:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-400"
        }
        disabled={todoDelete.isPending}
        onClick={() => todoDelete.mutate()}
      >
        X
      </button>
    </div>
  );
}
