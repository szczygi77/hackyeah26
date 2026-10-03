"use client";

import { useEffect, useId, useRef, useState } from "react";

export function A11yDock({
  tekst,
  ciemny,
  prosty,
}: {
  tekst: string;
  ciemny: boolean;
  prosty: boolean;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (sessionStorage.getItem("szczep-a11y-open") === "1") {
      setOpen(true);
      buttonRef.current?.focus();
    }
  }, []);

  function setOpenState(next: boolean) {
    setOpen(next);
    sessionStorage.setItem("szczep-a11y-open", next ? "1" : "0");
  }

  function rememberOpen() {
    sessionStorage.setItem("szczep-a11y-open", "1");
  }

  return (
    <div
      className="a11y-dock"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpenState(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <div id={panelId} className="a11y-panel" role="region" aria-label="Ustawienia dostępności" hidden={!open}>
        <div className="a11y-group">
          <p id={`${panelId}-tekst`}>Wielkość tekstu</p>
          <div className="lang-toggle" role="group" aria-labelledby={`${panelId}-tekst`}>
            <a href="/api/tekst?v=1" data-active={tekst === "1" ? "true" : "false"} onClick={rememberOpen}>
              A
            </a>
            <a href="/api/tekst?v=2" data-active={tekst === "2" ? "true" : "false"} onClick={rememberOpen}>
              A+
            </a>
            <a href="/api/tekst?v=3" data-active={tekst === "3" ? "true" : "false"} onClick={rememberOpen}>
              A++
            </a>
          </div>
        </div>
        <div className="a11y-group">
          <p id={`${panelId}-motyw`}>Kontrast</p>
          <div className="lang-toggle" role="group" aria-labelledby={`${panelId}-motyw`}>
            <a href="/api/motyw?v=jasny" data-active={!ciemny ? "true" : "false"} onClick={rememberOpen}>
              Jasny
            </a>
            <a href="/api/motyw?v=ciemny" data-active={ciemny ? "true" : "false"} onClick={rememberOpen}>
              Ciemny
            </a>
          </div>
        </div>
        <div className="a11y-group">
          <p id={`${panelId}-jezyk`}>Język</p>
          <div className="lang-toggle" role="group" aria-labelledby={`${panelId}-jezyk`}>
            <a href="/api/prosty?on=0" data-active={!prosty ? "true" : "false"} onClick={rememberOpen}>
              Standardowy
            </a>
            <a href="/api/prosty?on=1" data-active={prosty ? "true" : "false"} onClick={rememberOpen}>
              Prosty język
            </a>
          </div>
        </div>
      </div>
      <button
        ref={buttonRef}
        type="button"
        className="a11y-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenState(!open)}
      >
        Dostępność
      </button>
    </div>
  );
}
