"use client";

import { useState } from "react";
import {
  groupFields,
  isFieldVisible,
  prefillFromSubmission,
  rowCountOf,
  type CallField,
} from "@/lib/call-fields";
import { INKUBATOR_RODO } from "@/lib/inkubator-form";

type Source = {
  title: string;
  body: string;
  roleLabel: string | null;
  area: string | null;
  canvasJson: string | null;
};

export function WniosekForm({
  action,
  publicId,
  fields,
  source,
  showRodo,
}: {
  action: (formData: FormData) => void | Promise<void>;
  publicId: string;
  fields: CallField[];
  source: Source;
  showRodo: boolean;
}) {
  const kindField = fields.find((field) => field.key === "applicantKind");
  const initialKind = kindField?.options?.[0] || "";
  const [kind, setKind] = useState(initialKind);
  const values = kindField ? { [kindField.key]: kind } : {};
  const sections = groupFields(fields);

  return (
    <form action={action} className="panel">
      <input type="hidden" name="publicId" value={publicId} />
      {sections.map((section) => {
        const visible = section.fields.filter((field) => isFieldVisible(field, values));
        if (visible.length === 0) return null;
        return (
          <fieldset key={section.id} style={{ border: 0, margin: "0 0 1.5rem", padding: 0 }}>
            {section.id !== "_" ? (
              <legend style={{ fontSize: "1.2rem", fontWeight: 700, padding: 0 }}>
                {section.id}. {section.title}
              </legend>
            ) : null}
            {section.hint ? <p className="hint">{section.hint}</p> : null}
            {visible.map((field) => (
              <Field
                key={field.key}
                field={field}
                defaultValue={prefillFromSubmission(field, source)}
                kind={kind}
                onKind={setKind}
              />
            ))}
          </fieldset>
        );
      })}
      {showRodo ? (
        <details style={{ marginBottom: "1rem" }}>
          <summary>Klauzula informacyjna</summary>
          <p>{INKUBATOR_RODO}</p>
        </details>
      ) : null}
      <button className="btn" type="submit">
        Złóż wniosek w tym naborze
      </button>
    </form>
  );
}

function Field({
  field,
  defaultValue,
  kind,
  onKind,
}: {
  field: CallField;
  defaultValue: string;
  kind: string;
  onKind: (value: string) => void;
}) {
  const required = field.required !== false;
  if (field.type === "select") {
    return (
      <div className="field">
        <label htmlFor={field.key}>{field.label}</label>
        {field.hint ? <p className="hint">{field.hint}</p> : null}
        <select
          id={field.key}
          name={field.key}
          required={required}
          value={field.key === "applicantKind" ? kind : undefined}
          defaultValue={field.key === "applicantKind" ? undefined : defaultValue || field.options?.[0]}
          onChange={field.key === "applicantKind" ? (event) => onKind(event.target.value) : undefined}
        >
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (field.type === "checkbox") {
    return (
      <div className="field">
        <label>
          <input type="checkbox" name={field.key} value="tak" required={required} /> {field.label}
        </label>
      </div>
    );
  }
  if (field.type === "rows") {
    const columns = field.columns ?? [];
    return (
      <div className="field">
        <table className="data-table">
          <caption>{field.label}</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rowCountOf(field) }, (_, row) => (
              <tr key={row}>
                {columns.map((column, columnIndex) => (
                  <td key={column}>
                    <label className="hint" htmlFor={`${field.key}-${row}-${columnIndex}`}>
                      {column}, wiersz {row + 1}
                    </label>
                    <input id={`${field.key}-${row}-${columnIndex}`} name={`${field.key}__${row}__${columnIndex}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (field.type === "text") {
    return (
      <div className="field">
        <label htmlFor={field.key}>{field.label}</label>
        {field.hint ? <p className="hint">{field.hint}</p> : null}
        <input id={field.key} name={field.key} required={required} defaultValue={defaultValue} />
      </div>
    );
  }
  return (
    <div className="field">
      <label htmlFor={field.key}>{field.label}</label>
      {field.hint ? <p className="hint">{field.hint}</p> : null}
      <textarea id={field.key} name={field.key} required={required} defaultValue={defaultValue} />
    </div>
  );
}
