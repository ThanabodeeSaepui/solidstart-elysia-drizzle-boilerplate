import { createSignal } from "solid-js";
import type { Todo as TodoType } from "~/database/schema/todos";

interface TodoProps {
  todo: TodoType;
  onDelete: (id: number) => Promise<void>;
}

export default function Todo(props: TodoProps) {
  const [isDeleting, setIsDeleting] = createSignal(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await props.onDelete(props.todo.id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div class="flex flex-row justify-center gap-4">
      <pre>{props.todo.description}</pre>
      <button
        class="rounded-sm border-2 border-black bg-red-300 px-4 transition-all hover:bg-red-400 active:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-400"
        disabled={isDeleting()}
        onClick={handleDelete}
      >
        {isDeleting() ? "..." : "X"}
      </button>
    </div>
  );
}
