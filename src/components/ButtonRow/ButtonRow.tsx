import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./ButtonRow.css";
import type { Theme } from "../../types/types";

// SVGs
import Moon from "../../assets/moon.svg?react";
import Sun from "../../assets/sun.svg?react";
import Help from "../../assets/help.svg?react";
import Cog from "../../assets/cog.svg?react";

// Attribution: "Cat" icon by Solar Icons on SVGRepo — https://www.svgrepo.com/svg/524392/cat — CC BY 4.0 https://creativecommons.org/licenses/by/4.0/
// Attribution: "Cat" icon — source: https://www.svgrepo.com/svg/524392/cat
// See ATTRIBUTIONS.md for full details.
import Cat from "../../assets/cat.svg?react";

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

export default function ButtonRow() {
  const [openHelpModal, setHelpModalOpen] = useState(false);
  const [openSettingsModal, setSettingsModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  // Help Modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setHelpModalOpen(false);
    }
    if (openHelpModal) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openHelpModal]);

  useEffect(() => {
    if (!openHelpModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openHelpModal]);

  // Settings Modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSettingsModalOpen(false);
    }
    if (openSettingsModal) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSettingsModal]);

  useEffect(() => {
    if (!openSettingsModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openSettingsModal]);

  return (
    <>
      <div className="bottom-right">
        <button
          type="button"
          className="theme-btn transparent-styling"
          aria-label="Settings Button"
          title="Settings Button"
          onClick={() => setSettingsModalOpen(true)}
        >
          <Cog />
        </button>
        <button
          type="button"
          className="theme-btn transparent-styling"
          aria-label="Help Button"
          title="Help Button"
          onClick={() => setHelpModalOpen(true)}
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

      {openHelpModal &&
        createPortal(
          <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Help dialog"
            onClick={(e) => {
              if (e.target === e.currentTarget) setHelpModalOpen(false);
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

      {openSettingsModal &&
        createPortal(
          <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Settings dialog"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSettingsModalOpen(false);
            }}
          >
            <div className="modal-shell" tabIndex={-1}></div>
          </div>,
          document.body,
        )}
    </>
  );
}
