import { Show } from "solid-js";

interface FormInputProps {
  id: string;
  name: string;
  type: "text" | "email" | "password";
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onInput: (value: string) => void;
  onBlur?: () => void;
}

export default function FormInput(props: FormInputProps) {
  return (
    <div class="space-y-2">
      <label
        for={props.id}
        class="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {props.label}
      </label>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        onBlur={props.onBlur}
        onInput={(e) => {
          props.onInput(e.currentTarget.value);
        }}
        class="w-full rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-4 py-3 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800 focus:outline-none transition-all placeholder-slate-500 dark:placeholder-slate-400"
        placeholder={props.placeholder}
      />
      <Show when={props.error}>
        <p class="text-sm text-red-600 dark:text-red-400">{props.error}</p>
      </Show>
    </div>
  );
}
