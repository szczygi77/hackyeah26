const STEPS = [
  { label: "Opisz", hint: "Własne słowa" },
  { label: "Dopasuj", hint: "Trzy najbliższe karty" },
  { label: "Sprawdź", hint: "Czy to u Was zadziała" },
  { label: "Wdróż", hint: "Plan, test albo mentor" },
] as const;

export function Steps({ active }: { active?: number }) {
  const hasActive = typeof active === "number";
  return (
    <nav className="steps-panel" aria-label="Kroki: Opisz, Dopasuj, Sprawdź, Wdróż">
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
