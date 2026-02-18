import type { JSX } from "solid-js";
import {
  type Accessor,
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from "solid-js";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Accessor<Theme>;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>();

export function ThemeProvider(props: { children: JSX.Element }) {
  const [theme, setTheme_] = createSignal<Theme>("system");
  const [systemDark, setSystemDark] = createSignal(false);

  const setTheme = (value: Theme) => {
    localStorage.setItem("theme", value);
    setTheme_(value);
  };

  const toggleTheme = () => {
    const current = theme();
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  };

  onMount(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setTheme(stored);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mediaQuery.matches);
    const handleChange = () => setSystemDark(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  });

  createEffect(() => {
    const root = document.documentElement;
    const currentTheme = theme();
    const isDark =
      currentTheme === "dark" || (currentTheme === "system" && systemDark());
    root.classList.toggle("dark", isDark);
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
