/**
 * Feature #1 stub — "room photo → concept render".
 *
 * The BriefBuilder already collects the photo and has the UI states for a
 * results grid. To turn it on:
 *   1. set CONCEPT_ENABLED = true
 *   2. implement requestConcept() to POST the photo to an image model
 *      (via a serverless route so the API key stays server-side) and return
 *      the generated image URLs / data-URIs.
 *
 * A house-style prompt to start from:
 *   "Interior photograph of this exact room, restyled by a bespoke furniture
 *    studio: add solid {wood} {piece}, warm editorial lighting, natural
 *    textures, generous negative space. Keep the room's architecture and
 *    windows unchanged. Photorealistic."
 */

export const CONCEPT_ENABLED = false;

export async function requestConcept(_photoDataUrl: string): Promise<string[]> {
  // const res = await fetch("/api/concept", {
  //   method: "POST",
  //   headers: { "content-type": "application/json" },
  //   body: JSON.stringify({ image: _photoDataUrl }),
  // });
  // if (!res.ok) throw new Error("Concept request failed");
  // return (await res.json()).images as string[];
  throw new Error("Concept rendering is not configured yet.");
}
