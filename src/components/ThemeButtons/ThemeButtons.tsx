import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./ThemeButtons.css";

// SVGs
import Moon from "../../assets/moon.svg?react";
import Sun from "../../assets/sun.svg?react";
import Help from "../../assets/help.svg?react";

// Attribution: "Cat" icon by Solar Icons on SVGRepo — https://www.svgrepo.com/svg/524392/cat — CC BY 4.0 https://creativecommons.org/licenses/by/4.0/
// Attribution: "Cat" icon — source: https://www.svgrepo.com/svg/524392/cat
// See ATTRIBUTIONS.md for full details.
import Cat from "../../assets/cat.svg?react";

type Theme = "light" | "dark" | "catppuccin";
// tbh, im very bad with local storage stuff, this is pretty much full ai lol
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark"; // SSR
  try {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) return saved;
  } catch {
    /* storage blocked */
  }

  // system preference fallback
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches)
    return "dark";

  // final fallback
  return "dark";
}

export default function ThemeButtons() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    // apply theme to document so CSS can react immediately
    document.documentElement.setAttribute("data-theme", theme);
    // persist choice
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <div className="bottom-right">
        <button
          type="button"
          className="theme-btn transparent-styling"
          aria-label="Help Button"
          title="Help Button"
          onClick={() => setOpen(true)}
        >
          <Help />
        </button>

        <span className="vertical-divider" aria-hidden="true" />

        <button
          type="button"
          className="theme-btn transparent-styling"
          aria-label="Switch to dark theme"
          title="Switch to dark theme"
          onClick={() => setTheme("dark")}
        >
          <Moon />
        </button>

        <button
          type="button"
          className="theme-btn transparent-styling"
          aria-label="Switch to light theme"
          title="Switch to light theme"
          onClick={() => setTheme("light")}
        >
          <Sun />
        </button>

        <button
          type="button"
          className="theme-btn transparent-styling"
          aria-label="Switch to Catppuccin Theme"
          title="Switch to Catppuccin Theme"
          onClick={() => setTheme("catppuccin")}
        >
          <Cat />
        </button>
      </div>

      {open &&
        createPortal(
          <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Help dialog"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <div className="modal-shell" tabIndex={-1}>
              <h1>How to use this tool</h1>
              <p>
                Pick the two aspects you want to connect with the{" "}
                <strong>From</strong> and <strong>To</strong> dropdowns, then
                set <strong>Min. Steps</strong> to match the spacing you need in
                the research note.
              </p>
              <p>
                Click <strong>Find Connection</strong> to search for the
                shortest valid path that still meets that minimum length.
              </p>
              <p>
                If the result uses aspects you do not want, disable those
                aspects and try again. The path may get longer, but the script
                will keep looking for a valid route.
              </p>

              <h1>Licensing and Attribution Jargon</h1>
              <p>
                This work is licensed under a{" "}
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  Creative Commons Attribution 4.0 License
                </a>
              </p>
              <p>
                Original sources are hosted on{" "}
                <a href="https://github.com/ythri/tcresearch/tree/gh-pages">
                  GitHub
                </a>
                . Original webpage can be found{" "}
                <a href="https://ythri.github.io/tcresearch/">here</a>.
              </p>
              <p>
                Recreated by Floop (with the help of some AI lol). Fork hosted
                on{" "}
                <a href="https://github.com/Floopiiss/Thaumcraft-Research-Helper">
                  GitHub
                </a>
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
