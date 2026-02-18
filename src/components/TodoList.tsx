import { type Accessor, createResource, For, Show } from "solid-js";
import type { Todo as TodoType } from "~/database/schema/todos";
import { useSession } from "~/lib/auth-client";
import Todo from "./Todo";

interface TodoListProps {
  refreshKey: Accessor<number>;
  onRefresh?: () => void;
}

export default function TodoList(props: TodoListProps) {
  const session = useSession();
  const [todos] = createResource(
    () => [session().data?.user?.id ?? "", props.refreshKey()] as const,
    async () => {
      const res = await fetch("/api/todo", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch");
      return (await res.json()) as TodoType[];
    },
    { initialValue: [] },
  );

  const handleDelete = async (id: number) => {
    await fetch(`/api/todo/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    props.onRefresh?.();
  };

  return (
    <Show when={session().data}>
      <div class="space-y-4">
        <For each={todos()}>
          {(todo) => <Todo todo={todo} onDelete={handleDelete} />}
        </For>
      </div>
    </Show>
  );
}
