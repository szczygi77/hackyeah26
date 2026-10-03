export function PrivacyNote({ id }: { id: string }) {
  return (
    <p id={id} className="hint privacy-note">
      Bez danych osób trzecich. Bez logowania.
    </p>
  );
}
