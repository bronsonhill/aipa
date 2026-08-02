import { QuartzTransformerPlugin } from "../types"

export interface Options {
  // only files containing this marker are treated as decks
  deckMarker: RegExp
  // tag lines matching this are dropped from the rendered card
  tagLine: RegExp
}

const defaultOptions: Options = {
  deckMarker: /^#flashcards(\/\S+)?\s*$/m,
  tagLine: /^#[\w/-]+(\s+#[\w/-]+)*\s*$/,
}

// the Obsidian Spaced Repetition plugin writes personal review state as an
// inline comment under each card; it is never part of the card content
const srComment = /^<!--SR:.*-->\s*$/

const fence = /^\s*(```|~~~)/

const wikilink = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g

// <summary> content is raw HTML, so markdown inside it is never parsed —
// render wikilinks as their display text rather than leaving the brackets
function plainText(s: string): string {
  return s.replace(wikilink, (_, target, alias) => alias ?? target)
}

// split on blank lines, but keep fenced code blocks intact so a stray `?`
// inside an example never looks like a card separator
function blocks(lines: string[]): string[][] {
  const out: string[][] = []
  let cur: string[] = []
  let inFence = false

  for (const line of lines) {
    if (fence.test(line)) inFence = !inFence

    if (!inFence && line.trim() === "") {
      if (cur.length) out.push(cur)
      out.push([])
      cur = []
    } else {
      cur.push(line)
    }
  }
  if (cur.length) out.push(cur)
  return out
}

export const CueCards: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "CueCards",
    textTransform(_ctx, src) {
      if (!opts.deckMarker.test(src)) return src

      return blocks(src.split("\n"))
        .map((block) => {
          // never reinterpret code as a card — a bare `?` is legal in a sample
          if (block.some((l) => fence.test(l)) || /^(\s{4}|\t)/.test(block[0])) {
            return block.join("\n")
          }

          const sep = block.findIndex((l) => l.trim() === "?")
          if (sep <= 0 || sep === block.length - 1) return block.join("\n")

          const question = plainText(block.slice(0, sep).join(" ").trim())
          const answer = block
            .slice(sep + 1)
            .filter((l) => !srComment.test(l) && !opts.tagLine.test(l))
            .join("\n")
            .trim()

          if (answer === "") return block.join("\n")

          return [
            `<details class="cue-card">`,
            `<summary>${question}</summary>`,
            ``,
            answer,
            ``,
            `</details>`,
          ].join("\n")
        })
        .join("\n")
    },
  }
}
