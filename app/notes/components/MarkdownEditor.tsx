import Prism from "prismjs"
import React, { useState, useCallback, useMemo } from "react"
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react"
import { Node, Text, createEditor, Range } from "slate"
import { withHistory } from "slate-history"

// eslint-disable-next-line
;Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

type Token =
  | {
      type: string
      content: Array<Token>
      length: number
      alias?: string
    }
  | string

const getLength = (token: Token) => {
  if (typeof token === "string") {
    return token.length
  } else if (typeof token.content === "string") {
    return (token.content as string).length
  } else {
    return token.content.reduce((s, t) => s + getLength(t), 0)
  }
}

const MarkdownPreviewExample = () => {
  const [value, setValue] = useState<Node[]>(initialValue)
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const decorate = useCallback(([node, path]) => {
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
            const hashes = token.content.find(
              (innerToken: any) => innerToken.type === "punctuation"
            )
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
  }, [])

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable decorate={decorate} renderLeaf={renderLeaf} placeholder="Write some markdown..." />
    </Slate>
  )
}
const h1Size = (level: number) => {
  switch (level) {
    case 1:
      return "h1"
    case 2:
      return "h2"
    default:
      return "h3"
  }
}
const Leaf = ({ attributes, children, leaf, text }: RenderLeafProps) => {
  if (leaf.title) {
    const Component = h1Size((leaf.level as number) || 1)
    children = <Component>{children}</Component>
  }
  if (leaf.punctuation) {
    children = <span style={{ opacity: 0.5 }}>{children}</span>
  }

  // if (leaf.blockquote) return <Blockquote {...attributes}>{children}</Blockquote>
  if (leaf.hr) return <hr />
  if (leaf.list) return <li {...attributes}>{children}</li>
  // if (leaf.punctuation) {
  //   return (
  //     <span as="span" {...attributes} color={"blue.500"}>
  //       {children}
  //     </span>
  //   )
  // }
  if (leaf.bold) children = <strong>{children}</strong>

  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <span style={{ textDecoration: "underline" }}>{children}</span>
  }

  return <span {...attributes}>{children}</span>
}

const initialValue = [
  {
    children: [
      {
        text:
          "Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.",
      },
    ],
  },
  {
    children: [{ text: "## Try it out!" }],
  },
  {
    children: [{ text: "Try it out for yourself!" }],
  },
]

export default MarkdownPreviewExample
