import { cosine, tokenEmbedding } from "@/lib/match/embed";

export type GapItem = {
  id: string;
  publicId: string;
  body: string;
  createdAt: Date;
};

export type GapCluster = {
  id: string;
  label: string;
  count: number;
  examples: string[];
  publicIds: string[];
};

/** Simple clustering of gap submissions by embedding similarity. */
export function clusterGaps(items: GapItem[], threshold = 0.55): GapCluster[] {
  const vectors = items.map((it) => ({
    item: it,
    vec: tokenEmbedding(it.body),
  }));

  const clusters: { members: typeof vectors; centroid: number[] }[] = [];

  for (const v of vectors) {
    let bestIdx = -1;
    let bestSim = threshold;
    for (let i = 0; i < clusters.length; i++) {
      const sim = cosine(v.vec, clusters[i].centroid);
      if (sim >= bestSim) {
        bestSim = sim;
        bestIdx = i;
      }
    }
    if (bestIdx === -1) {
      clusters.push({ members: [v], centroid: [...v.vec] });
    } else {
      const c = clusters[bestIdx];
      c.members.push(v);
      const n = c.members.length;
      c.centroid = c.centroid.map((x, i) => (x * (n - 1) + v.vec[i]) / n);
    }
  }

  return clusters
    .map((c, idx) => {
      const bodies = c.members.map((m) => m.item.body);
      const label = summarizeLabel(bodies[0] || "luka");
      return {
        id: `cluster-${idx}`,
        label,
        count: c.members.length,
        examples: bodies.slice(0, 3).map((b) => b.slice(0, 140)),
        publicIds: c.members.map((m) => m.item.publicId),
      };
    })
    .sort((a, b) => b.count - a.count);
}

function summarizeLabel(text: string): string {
  const words = text
    .toLowerCase()
    .split(/[^a-ząćęłńóśźż0-9]+/i)
    .filter((w) => w.length > 3)
    .slice(0, 5);
  return words.length ? words.join(" · ") : text.slice(0, 40);
}
