const STEPS = [
  { label: "Opisz", hint: "Problem gminy lub organizacji" },
  { label: "Dopasuj", hint: "Karty powyżej progu" },
  { label: "Sprawdź", hint: "Warunki z karty" },
  { label: "Przekaż", hint: "Lista braków do ROPS" },
] as const;

export function Steps({ active }: { active?: number }) {
  const hasActive = typeof active === "number";
  return (
    <nav className="steps-panel" aria-label="Kroki: Opisz, Dopasuj, Sprawdź, Przekaż">
      <ol className="steps">
        {STEPS.map((step, i) => {
          const complete = hasActive && i < active;
          const isActive = hasActive && i === active;
          return (
            <li
              key={step.label}
              data-active={isActive ? "true" : "false"}
              data-complete={complete ? "true" : "false"}
              aria-current={isActive ? "step" : undefined}
            >
              <span className="step-mark" aria-hidden="true">
                {complete ? "✓" : i + 1}
              </span>
              <span className="step-copy">
                <strong>
                  {i + 1}. {step.label}
                </strong>
                <span className="step-hint">{step.hint}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
