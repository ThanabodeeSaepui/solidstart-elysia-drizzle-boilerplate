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
    <div class="flex items-center justify-between gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200">
      <div class="flex-1">
        <p class="text-slate-900 dark:text-slate-100 font-medium">
          {props.todo.description}
        </p>
      </div>
      <button
        class="px-3 py-1.5 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800 disabled:cursor-not-allowed disabled:opacity-50
               bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-700 border border-red-300
               dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:active:bg-red-900/60 dark:text-red-400 dark:border-red-700
               disabled:bg-red-100 disabled:hover:bg-red-100 dark:disabled:bg-red-900/20 dark:disabled:hover:bg-red-900/20"
        disabled={isDeleting()}
        onClick={handleDelete}
        title="Delete todo"
      >
        {isDeleting() ? (
          <div class="flex items-center gap-1">
            <div class="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          "Delete"
        )}
      </button>
    </div>
  );
}
