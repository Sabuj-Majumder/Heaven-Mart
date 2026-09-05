import { useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { useConfig } from "@/lib/config-store";
import { CONCEPT_ENABLED } from "@/lib/concept";
import {
  brand,
  briefIncluded,
  briefLeadTime,
  briefPieces,
  briefRooms,
  briefSizes,
  briefStages,
  briefStyles,
  briefTimelines,
  briefWaLink,
  buildBriefMessage,
  finishes,
  pricingBands,
  pricingIntro,
  roomForPiece,
  visitWaLink,
  type BriefState,
} from "@/content/site";

const STEPS = ["Piece", "Style", "Timeline", "Review"] as const;

function Chip({
  active,
  small,
  onClick,
  children,
}: {
  active: boolean;
  small?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-sm border transition-colors duration-200 ${
        small ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
      } ${
        active
          ? "border-primary bg-[color-mix(in_oklab,var(--brass)_12%,transparent)] text-foreground"
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function BriefBuilder() {
  const cfg = useConfig();

  // Room / wood / size arrive from the hero; the builder keeps local overrides
  // so a change here doesn't require scrolling back up.
  const [override, setOverride] = useState<Partial<Pick<BriefState, "room" | "wood" | "size">>>({});
  const room = override.room ?? roomForPiece[cfg.piece];
  const wood = override.wood ?? cfg.finish;
  const size = override.size ?? cfg.size;

  const [step, setStep] = useState(0);
  const [piece, setPiece] = useState("");
  const [style, setStyle] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [note, setNoteMsg] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const brief = useMemo<BriefState>(
    () => ({ room, piece, style, wood, size, timeline, notes, hasPhoto }),
    [room, piece, style, wood, size, timeline, notes, hasPhoto],
  );
  const message = useMemo(() => buildBriefMessage(brief), [brief]);
  const roomPieces = briefPieces[room] ?? [];

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return piece.trim().length > 0;
      case 1:
        return !!style;
      case 2:
        return !!timeline;
      default:
        return true;
    }
  }, [step, piece, style, timeline]);

  const onPickPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 12 * 1024 * 1024) {
      setNoteMsg("That image is over 12 MB — please choose a smaller one.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(typeof reader.result === "string" ? reader.result : null);
      setNoteMsg(null);
      setHasPhoto(true);
    };
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setPhotoUrl(null);
    setHasPhoto(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setNoteMsg("Brief copied to your clipboard.");
    } catch {
      setNoteMsg("Couldn't copy — you can select the text in WhatsApp instead.");
    }
  };

  const restart = () => {
    setOverride({});
    setStep(0);
    setPiece("");
    setStyle(null);
    setTimeline(null);
    setNotes("");
    setHasPhoto(false);
    setPhotoUrl(null);
    setNoteMsg(null);
    setSent(false);
  };

  const roomLabel = briefRooms.find((r) => r.id === room)?.label ?? "—";
  const woodLabel = finishes.find((f) => f.id === wood)?.label ?? "—";
  const sizeLabel = briefSizes.find((s) => s.id === size)?.label ?? "—";

  const summaryRows: [string, string | null][] = [
    ["Room", roomLabel],
    ["Piece", piece.trim() || null],
    ["Style", briefStyles.find((s) => s.id === style)?.label ?? null],
    ["Wood", woodLabel],
    ["Size", sizeLabel],
    ["Timeline", briefTimelines.find((t) => t.id === timeline)?.label ?? null],
    ["Notes", notes.trim() || null],
    ["Photo", hasPhoto ? "Will send in chat" : null],
  ];

  return (
    <section id="start" className="border-t border-border bg-[var(--surface)]">
      <div className="mx-auto max-w-[820px] px-6 py-24 lg:py-32">
        <p className="eyebrow">Start your piece</p>
        <h2 className="mt-6 text-[clamp(2.1rem,5vw,3.6rem)] tracking-[-0.02em]">
          Build your brief in a minute
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
          Your room, wood and size are carried over from above — we just need the rest, then it goes
          to WhatsApp with everything in hand. The consultation is free.
        </p>

        {/* carried-over selections, still editable here */}
        {!sent && (
          <div className="mt-9 space-y-3 border-y border-border py-6">
            <SummaryRow label="Room">
              {briefRooms.map((r) => (
                <Chip
                  key={r.id}
                  small
                  active={r.id === room}
                  onClick={() => setOverride((o) => ({ ...o, room: r.id }))}
                >
                  {r.label}
                </Chip>
              ))}
            </SummaryRow>
            <SummaryRow label="Wood">
              {finishes.map((f) => (
                <Chip
                  key={f.id}
                  small
                  active={f.id === wood}
                  onClick={() => setOverride((o) => ({ ...o, wood: f.id }))}
                >
                  {f.label}
                </Chip>
              ))}
            </SummaryRow>
            <SummaryRow label="Size">
              {briefSizes.map((s) => (
                <Chip
                  key={s.id}
                  small
                  active={s.id === size}
                  onClick={() => setOverride((o) => ({ ...o, size: s.id }))}
                >
                  {s.label}
                </Chip>
              ))}
            </SummaryRow>
          </div>
        )}

        {/* progress */}
        {!sent && (
          <div className="mt-8">
            <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
              <span>{STEPS[step]}</span>
              <span>
                {step + 1} / {STEPS.length}
              </span>
            </div>
            <div className="mt-3 h-px w-full bg-border">
              <div
                className="h-px bg-primary transition-[width] duration-500"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <p className="sr-only" aria-live="polite">
          {sent ? "Brief ready" : `Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}
        </p>

        <div
          key={sent ? "sent" : step}
          className="mt-10 min-h-[220px] animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          {!sent && step === 0 && (
            <div>
              <h3 className="text-xl">What are we making?</h3>
              {roomPieces.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {roomPieces.map((p) => (
                    <Chip key={p} active={piece === p} onClick={() => setPiece(p)}>
                      {p}
                    </Chip>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={piece}
                onChange={(e) => setPiece(e.target.value)}
                placeholder={
                  roomPieces.length ? "or describe it" : "e.g. a window seat with storage"
                }
                className="mt-4 w-full max-w-md border-b border-border bg-transparent py-2 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
          )}

          {!sent && step === 1 && (
            <div>
              <h3 className="text-xl">Pick a direction</h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {briefStyles.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStyle(s.id)}
                    aria-pressed={style === s.id}
                    className={`group overflow-hidden border text-left transition-colors ${
                      style === s.id ? "border-primary" : "border-border"
                    }`}
                  >
                    <img
                      src={s.image}
                      alt=""
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm text-foreground">{s.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.note}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!sent && step === 2 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl">When would you like it?</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {briefTimelines.map((t) => (
                    <Chip key={t.id} active={t.id === timeline} onClick={() => setTimeline(t.id)}>
                      {t.label}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="brief-notes" className="text-xl">
                  Anything else?
                </label>
                <textarea
                  id="brief-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Dimensions, a deadline, a piece you're matching, a link…"
                  className="mt-4 w-full border border-border bg-transparent p-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          )}

          {!sent && step === 3 && (
            <div className="space-y-10">
              <div>
                <h3 className="text-xl">Your brief</h3>
                <dl className="mt-5 border-y border-border text-sm">
                  {summaryRows.map(([k, v]) =>
                    v ? (
                      <div
                        key={k}
                        className="flex gap-6 border-b border-border py-3 last:border-b-0"
                      >
                        <dt className="w-24 shrink-0 text-muted-foreground">{k}</dt>
                        <dd className="text-foreground">{v}</dd>
                      </div>
                    ) : null,
                  )}
                </dl>
              </div>

              {/* optional photo — here, not up front */}
              <div>
                <p className="text-sm text-foreground">
                  Add a photo of the room <span className="text-muted-foreground">(optional)</span>
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={onPickPhoto}
                  className="sr-only"
                />
                <div className="mt-3">
                  {photoUrl ? (
                    <div className="relative w-full max-w-xs overflow-hidden border border-border">
                      <img
                        src={photoUrl}
                        alt="The room you want furnished"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearPhoto}
                        className="absolute right-2 top-2 rounded-sm bg-background/80 px-2 py-1 text-xs backdrop-blur transition-colors hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="rounded-sm border border-dashed border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                    >
                      + Choose a photo
                    </button>
                  )}
                  {CONCEPT_ENABLED && photoUrl && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Preparing a concept direction…
                    </p>
                  )}
                </div>
              </div>

              <div className="border border-border p-6">
                <p className="eyebrow">What happens next</p>
                <ol className="mt-4 space-y-3">
                  {briefStages.map((s, i) => (
                    <li key={s.t} className="flex gap-3 text-sm">
                      <span className="font-display text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="text-foreground">{s.t}.</span>{" "}
                        <span className="text-muted-foreground">{s.d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {briefLeadTime}
                </p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-xs leading-relaxed text-muted-foreground">{pricingIntro}</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                    {pricingBands.map((b) => (
                      <li key={b.name} className="text-xs">
                        <span className="text-foreground">{b.name}</span>
                        <span className="mt-0.5 block leading-relaxed text-muted-foreground">
                          {b.note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  {briefIncluded.map((i) => (
                    <li key={i}>· {i}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={briefWaLink(brief)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSent(true)}
                  className="group inline-flex items-center justify-center gap-3 rounded-sm bg-primary px-9 py-4 text-[0.95rem] uppercase tracking-[0.18em] text-primary-foreground transition-all duration-500 hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--brass)_88%,white)] hover:shadow-[0_18px_36px_-16px_color-mix(in_oklab,var(--brass)_70%,transparent)]"
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                    strokeWidth={1.75}
                  />
                  Send brief on WhatsApp
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a
                  href={visitWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0"
                    strokeWidth={1.75}
                  />
                  <span className="underline-grow pb-0.5 transition-[background-size] duration-300 group-hover:[background-size:100%_1px]">
                    or book a showroom visit
                  </span>
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                Prefer to talk?{" "}
                <a
                  href={brand.phoneHref}
                  className="group inline-flex items-center gap-1 align-middle text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone aria-hidden="true" className="h-3 w-3 shrink-0" strokeWidth={1.75} />
                  <span className="underline-grow pb-0.5 transition-[background-size] duration-300 group-hover:[background-size:100%_1px]">
                    {brand.phone}
                  </span>
                </a>
              </p>
            </div>
          )}

          {sent && (
            <div className="space-y-6">
              <h3 className="text-2xl">Opening WhatsApp…</h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Your brief is in the message — just hit send. We reply on WhatsApp, usually within a
                day.
                {hasPhoto ? " You can attach your room photo in the chat." : ""}
              </p>
              <div className="flex flex-wrap gap-5 text-sm">
                <button
                  type="button"
                  onClick={copyBrief}
                  className="border-b border-border pb-0.5 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  Copy the brief
                </button>
                <button
                  type="button"
                  onClick={restart}
                  className="border-b border-border pb-0.5 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  Start over
                </button>
              </div>
              {note && <p className="text-xs text-primary">{note}</p>}
            </div>
          )}
        </div>

        {!sent && (
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
            >
              ← Back
            </button>
            {step < STEPS.length - 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canContinue}
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        )}
        {note && !sent && <p className="mt-3 text-xs text-primary">{note}</p>}
      </div>
    </section>
  );
}

function SummaryRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-14 shrink-0 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
