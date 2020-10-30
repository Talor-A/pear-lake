import Prism from "prismjs"
import "prismjs/components/prism-markdown"
import React, { useState, useCallback, useMemo } from "react"
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react"
import { Node, Text, createEditor, NodeEntry, Range } from "slate"
import { withHistory } from "slate-history"
import { Divider, Heading, ListItem, Text as Paragraph } from "@chakra-ui/core"

const getLength = (token) => {
  let length
  if (typeof token === "string") {
    length = token.length
  } else if (typeof token.content === "string") {
    length = token.content.length
  } else {
    length = token.content.reduce((l, t) => l + getLength(t), 0)
  }
  console.log("token:", token, "length:", length)
  return length
}
const MarkdownPreviewExample = () => {
  const [value, setValue] = useState<Node[]>(initialValue)
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const decorate = useCallback(([node, path]) => {
    const ranges: Range[] = []
    if (!Text.isText(node)) {
      console.log("not text:", node)
      return ranges
    }
    const tokens = Prism.tokenize(node.text, Prism.languages.markdown)
    let start = 0

    for (const token of tokens) {
      const { content, length, type } = token
      let level
      if (type === "title") {
        const hashes = content.find((innerToken) => innerToken.type === "punctuation")
        level = hashes.length
        console.log("level", level)
      }

      // const length = getLength(token)
      const end = start + length

      if (typeof token !== "string") {
        ranges.push({
          [token.type]: true,
          level,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        })
      }

      start = end
    }

    return ranges
  }, [])

  return (
    <>
      <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <Editable
          decorate={decorate}
          renderLeaf={renderLeaf}
          placeholder="Write some markdown..."
        />
      </Slate>
      <Divider my={4} />
      <p>{JSON.stringify(value, null, 2)}</p>
    </>
  )
}

const headingSize = (level: number) => {
  switch (level) {
    case 1:
      return "2xl"
    case 2:
      return "xl"
    default:
      return "lg"
  }
}
const Leaf = ({ attributes, children, leaf, text }: RenderLeafProps) => {
  if (leaf.punctuation) {
    return (
      <Paragraph {...attributes} color={"blue.500"}>
        {children}
      </Paragraph>
    )
  }
  if (leaf.title) {
    return (
      <Heading size={headingSize((leaf.level as number) || 1)} {...attributes}>
        {children}
      </Heading>
    )
  }
  if (leaf.hr) return <Divider />
  if (leaf.list) return <ListItem {...attributes}>{children}</ListItem>

  return (
    <Paragraph
      as="span"
      {...attributes}
      fontWeight={leaf.bold && "bold"}
      fontStyle={leaf.italic && "italic"}
      textDecoration={leaf.underlined && "underline"}

      // className={css`
      //   font-weight: ${leaf.bold && "bold"};
      //   font-style: ${leaf.italic && "italic"};
      //   text-decoration: ${leaf.underlined && "underline"};
      //   ${leaf.title &&
      //   css`
      //     display: inline-block;
      //     font-weight: bold;
      //     font-size: 20px;
      //     margin: 20px 0 10px 0;
      //   `}
      //   ${leaf.list &&
      //   css`
      //     padding-left: 10px;
      //     font-size: 20px;
      //     line-height: 10px;
      //   `}
      //   ${leaf.hr &&
      //   css`
      //     display: block;
      //     text-align: center;
      //     border-bottom: 2px solid #ddd;
      //   `}
      //   ${leaf.blockquote &&
      //   css`
      //     display: inline-block;
      //     border-left: 2px solid #ddd;
      //     padding-left: 10px;
      //     color: #aaa;
      //     font-style: italic;
      //   `}
      //   ${leaf.code &&
      //   css`
      //     font-family: monospace;
      //     background-color: #eee;
      //     padding: 3px;
      //   `}
      // `}
    >
      {children}
    </Paragraph>
  )
}
const initialValue = [
  // {
  //   children: [
  //     {
  //       text:
  //         "Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.",
  //     },
  //   ],
  // },
  {
    children: [{ text: "## Try it out!" }],
  },
  {
    children: [{ text: "Try it out for yourself!" }],
  },
]
export default MarkdownPreviewExample
