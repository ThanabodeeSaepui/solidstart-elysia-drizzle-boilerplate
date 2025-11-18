import { type Component, createSignal, Show } from "solid-js";
import { useSession } from "~/lib/auth-client";

export interface TodoFormProps {
  onCreated?: () => void;
}

const TodoForm: Component<TodoFormProps> = (props) => {
  const session = useSession();
  const [description, setDescription] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const desc = description().trim();
    if (!desc) return;

    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: desc }),
      credentials: "include",
    });

    if (res.ok) {
      setDescription("");
      props.onCreated?.();
    } else {
      console.error("Failed to create todo");
    }
  };

  return (
    <Show when={session().data}>
      <form
        onSubmit={handleSubmit}
        class="mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <div class="relative">
          <input
            type="text"
            value={description()}
            onInput={(e) => setDescription(e.currentTarget.value)}
            placeholder="What needs to be done?"
            class="w-full p-4 pl-12 pr-12 text-lg border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 transition-all duration-200"
            required
          />
          <button
            type="submit"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-medium px-6 py-2 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-500/50"
          >
            Add
          </button>
        </div>
      </form>
    </Show>
  );
};

export default TodoForm;
