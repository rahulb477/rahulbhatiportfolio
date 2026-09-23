import { useCallback, useMemo, useRef, useState } from "react";

const GLYPHS: Record<string, string[]> = {
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  W: ["10001", "10001", "10001", "10001", "10101", "11011", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
};

// Six targets per word, distributed across the complete 29-column glyph grid.
const DAMAGEABLE_COORDINATES = new Set([
  "HELLO:0:0",
  "HELLO:3:2",
  "HELLO:0:8",
  "HELLO:3:8",
  "HELLO:6:15",
  "HELLO:3:28",
  "WORLD:0:0",
  "WORLD:0:8",
  "WORLD:3:14",
  "WORLD:6:21",
  "WORLD:0:26",
  "WORLD:3:28",
]);

const MAX_DAMAGE = 12;

type Pixel = {
  id: string;
  row: number;
  column: number;
  active: boolean;
  damageable: boolean;
};

type PixelWord = {
  word: string;
  columns: number;
  pixels: Pixel[];
};

function createPixelWord(word: string): PixelWord {
  const rows = Array.from({ length: 7 }, () => [] as Pixel[]);

  word.split("").forEach((letter, letterIndex) => {
    GLYPHS[letter].forEach((glyphRow, row) => {
      glyphRow.split("").forEach((value, glyphColumn) => {
        const column = letterIndex * 6 + glyphColumn;
        const active = value === "1";
        rows[row].push({
          id: `${word}-${row}-${column}`,
          row,
          column,
          active,
          damageable: active && DAMAGEABLE_COORDINATES.has(`${word}:${row}:${column}`),
        });
      });

      if (letterIndex < word.length - 1) {
        const column = letterIndex * 6 + 5;
        rows[row].push({
          id: `${word}-${row}-${column}`,
          row,
          column,
          active: false,
          damageable: false,
        });
      }
    });
  });

  return {
    word,
    columns: word.length * 5 + word.length - 1,
    pixels: rows.flat(),
  };
}

const HELLO_WORLD_GRID = [createPixelWord("HELLO"), createPixelWord("WORLD")];
const DAMAGEABLE_IDS = HELLO_WORLD_GRID.flatMap(({ pixels }) =>
  pixels.filter((pixel) => pixel.damageable).map((pixel) => pixel.id),
);
const DAMAGEABLE_ID_SET = new Set(DAMAGEABLE_IDS);

if (DAMAGEABLE_IDS.length !== MAX_DAMAGE) {
  throw new Error("Hello World must contain exactly 12 damageable pixels.");
}

function PixelText({
  data,
  damaged,
  onDamage,
}: {
  data: PixelWord;
  damaged: Set<string>;
  onDamage: (id: string) => void;
}) {
  return (
    <div
      className="pixel-word-grid"
      style={{ gridTemplateColumns: `repeat(${data.columns}, minmax(0, 1fr))` }}
      aria-label={data.word}
    >
      {data.pixels.map((pixel) => {
        if (!pixel.active) {
          return <span key={pixel.id} className="pixel-cell pixel-cell-empty" aria-hidden="true" />;
        }

        if (!pixel.damageable) {
          return <span key={pixel.id} className="pixel-cell pixel-cell-static" aria-hidden="true" />;
        }

        const isDamaged = damaged.has(pixel.id);
        return (
          <button
            key={pixel.id}
            type="button"
            tabIndex={-1}
            aria-label={`Damage ${data.word} pixel at row ${pixel.row + 1}, column ${pixel.column + 1}`}
            aria-pressed={isDamaged}
            disabled={isDamaged}
            onPointerDown={(event) => {
              event.preventDefault();
              onDamage(pixel.id);
            }}
            onClick={() => onDamage(pixel.id)}
            className={`pixel-cell pixel-cell-damageable ${isDamaged ? "pixel-cell-damaged" : ""}`}
          />
        );
      })}
    </div>
  );
}

export default function HelloWorldGame() {
  const [damaged, setDamaged] = useState<Set<string>>(() => new Set());
  const boardRef = useRef<HTMLDivElement>(null);
  const completed = damaged.size === MAX_DAMAGE;
  const nextAvailable = useMemo(
    () => DAMAGEABLE_IDS.find((id) => !damaged.has(id)),
    [damaged],
  );

  const damagePixel = useCallback((id: string) => {
    if (!DAMAGEABLE_ID_SET.has(id)) return;
    setDamaged((current) => {
      if (current.has(id) || current.size >= MAX_DAMAGE) return current;
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }, []);

  const reset = () => {
    setDamaged(new Set());
    boardRef.current?.focus({ preventScroll: true });
  };

  return (
    <section id="play" className="bg-[#050505] text-white py-24 md:py-32 px-4 sm:px-6 md:px-16 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-4">
          Developer experiment
        </span>
        <div className="inline-block max-w-full mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.02] text-[#d6d3ce]">
            Break it if you can. It still ships.
          </h2>
          <span className="block h-px mt-4 bg-[#d6d3ce]" aria-hidden="true" />
        </div>

        <div className={`game-panel hello-game-panel rounded-2xl border p-4 sm:p-7 md:p-10 ${completed ? "border-white/30" : "border-white/10"}`}>
          <div className="flex items-center justify-between gap-4 pb-4 mb-7 sm:pb-5 sm:mb-10 border-b border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.25em]">
            <span className={completed ? "text-[#e8e4dc]" : "text-gray-500"}>
              {completed ? "Ship status / Shipped" : "Ship status / Testing"}
            </span>
            <span className="text-gray-500 tabular-nums whitespace-nowrap">
              Damage {damaged.size.toString().padStart(2, "0")}/{MAX_DAMAGE}
            </span>
          </div>

          <div
            ref={boardRef}
            role="application"
            tabIndex={0}
            aria-label="Hello World pixel game. Tap the brighter pixels or press Space to damage the next available target."
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return;
              if ((event.key === " " || event.key === "Enter") && nextAvailable) {
                event.preventDefault();
                damagePixel(nextAvailable);
              }
            }}
            className="hello-pixel-board mx-auto max-w-4xl space-y-6 sm:space-y-10 py-3 sm:py-6 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#e8e4dc] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
          >
            {HELLO_WORLD_GRID.map((wordData) => (
              <PixelText key={wordData.word} data={wordData} damaged={damaged} onDamage={damagePixel} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 mt-7 sm:pt-6 sm:mt-10 border-t border-white/10">
            <p aria-live="polite" className="text-xs sm:text-sm text-gray-400">
              {completed ? "Build passed. The experiment still ships." : "Tap a brighter block, or focus the board and press Space."}
            </p>
            <button
              type="button"
              onClick={reset}
              disabled={!damaged.size}
              className="self-start sm:self-auto px-5 py-2.5 border border-white/20 text-[10px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}