import { Honeypot } from "@/components/Honeypot";
import { PrivacyNote } from "@/components/PrivacyNote";
import { submitTestInterest } from "@/lib/actions/test-submission";

export function TestInterestForm({
  innovationId,
  innovationTitle,
}: {
  innovationId: string;
  innovationTitle?: string;
}) {
  return (
    <form action={submitTestInterest} style={{ position: "relative" }}>
      <Honeypot />
      <input type="hidden" name="innovationId" value={innovationId} />
      {innovationTitle ? (
        <p className="hint" style={{ marginTop: 0 }}>
          Innowacja: <strong>{innovationTitle}</strong>
        </p>
      ) : null}
      <div className="field">
        <label htmlFor={`area-${innovationId}`}>Obszar / gmina</label>
        <input id={`area-${innovationId}`} name="area" required aria-describedby={`area-hint-${innovationId}`} />
        <PrivacyNote id={`area-hint-${innovationId}`} />
      </div>
      <div className="field">
        <label htmlFor={`role-${innovationId}`}>Rola</label>
        <select id={`role-${innovationId}`} name="roleLabel" defaultValue="JST">
          <option value="JST">JST / CUS</option>
          <option value="NGO">NGO</option>
          <option value="mieszkaniec">Mieszkaniec</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor={`name-${innovationId}`}>Imię / instytucja</label>
        <input id={`name-${innovationId}`} name="contactName" aria-describedby={`name-hint-${innovationId}`} />
        <PrivacyNote id={`name-hint-${innovationId}`} />
      </div>
      <div className="field">
        <label htmlFor={`email-${innovationId}`}>E-mail kontaktowy</label>
        <input id={`email-${innovationId}`} name="contactEmail" type="email" />
      </div>
      <div className="field">
        <label htmlFor={`rating-${innovationId}`}>Ocena (1–5, opcjonalnie)</label>
        <input id={`rating-${innovationId}`} name="rating" type="number" min={1} max={5} />
      </div>
      <div className="field">
        <label htmlFor={`improve-${innovationId}`}>Proponuję usprawnienie</label>
        <textarea id={`improve-${innovationId}`} name="improvement" aria-describedby={`improve-hint-${innovationId}`} />
        <PrivacyNote id={`improve-hint-${innovationId}`} />
      </div>
      <button className="btn" type="submit">
        Wyślij zgłoszenie testu
      </button>
    </form>
  );
}
