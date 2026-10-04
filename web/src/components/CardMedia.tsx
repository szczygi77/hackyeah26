import { parseMaterials, youtubeEmbedUrl } from "@/lib/json";

export function CardMedia({
  title,
  materialsJson,
  videoUrl,
  transcript,
  summary,
}: {
  title: string;
  materialsJson: string;
  videoUrl?: string | null;
  transcript?: string | null;
  summary?: string | null;
}) {
  const materials = parseMaterials(materialsJson);
  const embed = youtubeEmbedUrl(videoUrl);
  const textAlternative = transcript?.trim() || summary?.trim() || "Brak transkrypcji i opisu filmu.";

  return (
    <div className="card-media">
      {videoUrl ? (
        <div className="video-block">
          <h3 style={{ marginTop: 0, fontSize: "1.1rem" }}>Film</h3>
          {embed ? (
            <div className="video-frame">
              <iframe
                src={embed}
                title={`Film: ${title}. Materiał zewnętrzny.`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            <p>
              <a href={videoUrl} rel="noopener noreferrer">
                Otwórz film: {title}
              </a>
            </p>
          )}
          <p className="hint">
            Napisy zależą od serwisu, w którym leży film. Poniżej jest transkrypcja albo opis karty jako alternatywa
            tekstowa.
          </p>
          <div className="transcript" id="transkrypcja-filmu">
            <h4 style={{ margin: "0 0 0.35rem", fontSize: "1rem" }}>Transkrypcja</h4>
            <p style={{ margin: 0 }}>{textAlternative}</p>
          </div>
        </div>
      ) : (
        <p className="hint">Film: nie podano w tej karcie.</p>
      )}

      {materials.length > 0 && (
        <div className="materials-block">
          <h3 style={{ marginTop: "1rem", fontSize: "1.1rem" }}>Materiały</h3>
          <ul>
            {materials.map((m) => (
              <li key={`${m.label}-${m.url}`}>
                <a href={m.url} rel="noopener noreferrer">
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
