import { SlatePlugin } from "@udecode/slate-plugins"
import { RenderLeafProps } from "slate-react"
import { Text, Range } from "slate"
import Prism from "prismjs"

Prism.languages.markdown = Prism.languages.extend("markup", {})
Prism.languages.insertBefore("markdown", "prolog", {
  code: [
    { pattern: /^(?: {4}|\t).+/m, alias: "keyword" },
    { pattern: /``.+?``|`[^`\n]+`/, alias: "keyword" },
  ],
  // blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
  // title: [
  //   {
  //     pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
  //     alias: "important",
  //     inside: { punctuation: /==+$|--+$/ },
  //   },
  //   {
  //     pattern: /(^\s*)#+.+/m,
  //     lookbehind: !0,
  //     alias: "important",
  //     inside: { punctuation: /^#+|#+$/ },
  //   },
  // ],
  // hr: { pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: "punctuation" },
  // list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: "punctuation" },
  "url-reference": {
    pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
    inside: {
      variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
      string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
      punctuation: /^[\[\]!:]|[<>]/,
    },
    alias: "url",
  },
  bold: {
    pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
  },
  italic: {
    pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^[*_]|[*_]$/ },
  },
  url: {
    pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
      string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
    },
  },
})
Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url)
Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url)
Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic)
Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

type Token =
  | {
      type: string
      content: Array<Token>
      length: number
      alias?: string
    }
  | string

const Leaf = ({ attributes, children, leaf, text }: RenderLeafProps) => {
  if (leaf.punctuation) children = <span style={{ opacity: 0.5 }}>{children}</span>

  if (leaf.bold) children = <strong>{children}</strong>

  if (leaf.italic) children = <em>{children}</em>

  if (leaf.underline) children = <span style={{ textDecoration: "underline" }}>{children}</span>

  if (leaf.code) children = <code>{children}</code>

  return <span {...attributes}>{children}</span>
}

const getLength = (token: Token) => {
  if (typeof token === "string") {
    return token.length
  } else if (typeof token.content === "string") {
    return (token.content as string).length
  } else {
    return token.content.reduce((s, t) => s + getLength(t), 0)
  }
}

const decorate = ([node, path]) => {
  if (!Text.isText(node)) {
    return []
  }

  const tokens: Token[] = Prism.tokenize(node.text, Prism.languages.markdown)

  // console.group("TOKENS")
  // console.table(tokens.map((token) => [token, token.length]))
  // console.log("Tokens", tokens)

  const createRanges = (tokens: Token[], start = 0) => {
    let myRanges: Range[] = []
    for (const token of tokens) {
      const length = getLength(token)
      const end = start + length
      if (typeof token !== "string") {
        let obj: Range = {
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        }
        if (token.type === "title") {
          const hashes = token.content.find((innerToken: any) => innerToken.type === "punctuation")
          obj.level = hashes?.length || 1
        }
        if (token.alias) obj[token.alias] = true
        myRanges.push(obj)
        if (token.type !== "title") {
          myRanges = [...myRanges, ...createRanges(token.content, start)]
        }
      }
      start = end
    }
    return myRanges
  }

  const ranges = createRanges(tokens)
  // console.log("Ranges:", ranges)
  // console.groupEnd()

  return ranges
}

export const PreviewPlugin = (): SlatePlugin => ({
  decorate: decorate,
  renderLeaf: Leaf,
})
