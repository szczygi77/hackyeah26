import { parseMaterials, youtubeEmbedUrl } from "@/lib/json";

export function CardMedia({
  materialsJson,
  videoUrl,
  transcript,
}: {
  materialsJson: string;
  videoUrl?: string | null;
  transcript?: string | null;
}) {
  const materials = parseMaterials(materialsJson);
  const embed = youtubeEmbedUrl(videoUrl);

  return (
    <div className="card-media">
      {videoUrl && transcript ? (
        <div className="video-block">
          <h3 style={{ marginTop: 0, fontSize: "1.1rem" }}>Film</h3>
          {embed ? (
            <div className="video-frame">
              <iframe
                src={embed}
                title="Film o innowacji (materiał poglądowy)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            <p>
              <a href={videoUrl} rel="noopener noreferrer" target="_blank">
                Otwórz film
              </a>
            </p>
          )}
          {transcript ? <p className="hint">{transcript}</p> : null}
        </div>
      ) : videoUrl ? (
        <p className="hint">Film jest w materiałach źródłowych. Na karcie pokazujemy go dopiero z transkryptem (napisy).</p>
      ) : (
        <p className="hint">Film: nie podano.</p>
      )}

      {materials.length > 0 && (
        <div className="materials-block">
          <h3 style={{ marginTop: "1rem", fontSize: "1.1rem" }}>Materiały</h3>
          <ul>
            {materials.map((m) => (
              <li key={`${m.label}-${m.url}`}>
                <a href={m.url} rel="noopener noreferrer" target="_blank">
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
