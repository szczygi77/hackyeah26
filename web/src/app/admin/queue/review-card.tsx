"use client";

import { useState } from "react";
import { publishDraft, rejectDraft } from "./actions";

export function ReviewCard({
  draftId,
  title,
  description,
  requirements,
  ruralVariant,
  urbanVariant,
}: {
  draftId: string;
  title: string;
  description: string;
  requirements: string;
  ruralVariant: string;
  urbanVariant: string;
}) {
  const [rejectOpen, setRejectOpen] = useState(false);

  return (
    <section className="border-2 border-neutral-900 bg-white p-4 text-neutral-950" aria-labelledby={`draft-${draftId}`}>
      <h2 id={`draft-${draftId}`} className="text-2xl font-semibold">
        {title}
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="border-2 border-neutral-900 p-4">
          <h3 className="text-lg font-semibold">Obecna karta</h3>
          <p className="mt-3 whitespace-pre-wrap text-lg">{description}</p>
          <p className="mt-3 whitespace-pre-wrap text-lg">{requirements}</p>
        </div>
        <div className="border-2 border-green-800 bg-green-50 p-4">
          <h3 className="text-lg font-semibold">Propozycja innowatora</h3>
          <p className="mt-3 whitespace-pre-wrap text-lg">
            <span className="font-semibold">Miasto. </span>
            {urbanVariant || "Brak wariantu."}
          </p>
          <p className="mt-3 whitespace-pre-wrap text-lg">
            <span className="font-semibold">Wieś. </span>
            {ruralVariant || "Brak wariantu."}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3">
        <form action={publishDraft}>
          <input type="hidden" name="draftId" value={draftId} />
          <button
            className="min-h-14 w-full bg-green-800 px-4 text-xl font-semibold text-white focus:ring-2 focus:ring-blue-600"
            type="submit"
          >
            Zatwierdź i Publikuj
          </button>
        </form>
        <button
          className="min-h-14 w-full bg-red-800 px-4 text-xl font-semibold text-white focus:ring-2 focus:ring-blue-600"
          type="button"
          aria-expanded={rejectOpen}
          onClick={() => setRejectOpen(true)}
        >
          Odrzuć do poprawy
        </button>
        {rejectOpen && (
          <form action={rejectDraft} className="border-2 border-red-800 p-3">
            <input type="hidden" name="draftId" value={draftId} />
            <label className="text-base font-semibold" htmlFor={`feedback-${draftId}`}>
              Powód odrzucenia
            </label>
            <input
              id={`feedback-${draftId}`}
              name="feedback"
              required
              className="mt-1 w-full min-h-12 border-2 border-neutral-900 bg-white px-3 text-lg outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              className="mt-3 min-h-12 bg-red-800 px-4 text-lg font-semibold text-white focus:ring-2 focus:ring-blue-600"
              type="submit"
            >
              Potwierdź odrzucenie
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
