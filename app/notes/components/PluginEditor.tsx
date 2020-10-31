import React, { useMemo, useState } from "react"
import { createEditor, Node } from "slate"
import { withHistory } from "slate-history"
import { Slate, withReact } from "slate-react"
import {
  ParagraphPlugin,
  BoldPlugin,
  EditablePlugins,
  ItalicPlugin,
  UnderlinePlugin,
  MentionPlugin,
  pipe,
  // withNormalizeTypes,
  HeadingToolbar,
  DEFAULTS_HEADING,
  DEFAULTS_ITALIC,
  DEFAULTS_PARAGRAPH,
  DEFAULTS_UNDERLINE,
  DEFAULTS_BOLD,
  ToolbarElement,
  DEFAULTS_MENTION,
  useMention,
  MentionSelect,
} from "@udecode/slate-plugins"
import { Code, Divider, Icon } from "@chakra-ui/core"
const options = {
  ...DEFAULTS_HEADING,
  ...DEFAULTS_ITALIC,
  ...DEFAULTS_PARAGRAPH,
  ...DEFAULTS_UNDERLINE,
  ...DEFAULTS_BOLD,
  ...DEFAULTS_MENTION,
}
const plugins = [
  ParagraphPlugin(options),
  BoldPlugin(options),
  ItalicPlugin(options),
  UnderlinePlugin(options),
  MentionPlugin({
    mention: {
      ...options.mention,
      // onClick: (mentionable: MentionNodeData) => console.info(`Hello, I'm ${mentionable.id}`),
      // prefix: "@",
    },
  }), // HeadingPlugin(options),
]

const withPlugins = [
  withReact,
  withHistory,
  // withNormalizeTypes({
  //   rules: [{ path: [0, 0], strictType: options.h1.type }],
  // }),
] as const
export type EditorProps = {
  value: Node[]
  onChange: (value: Node[]) => void
}
const PluginEditor = ({ value, onChange }: EditorProps) => {
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])
  const {
    onAddMention,
    onChangeMention,
    onKeyDownMention,
    search,
    index,
    target,
    values,
  } = useMention(
    [
      {
        value: "talor_a",
        id: "1234",
      },
    ],
    {
      maxSuggestions: 10,
      trigger: "@",
    }
  )
  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          onChange(value)
          onChangeMention(editor)
        }}
      >
        {" "}
        <EditablePlugins
          plugins={plugins}
          placeholder="Enter some text..."
          onKeyDown={[onKeyDownMention]}
          onKeyDownDeps={[index, search, target]}
        />
        <MentionSelect
          at={target}
          valueIndex={index}
          options={values}
          onClickMention={onAddMention}
        />
      </Slate>
      <Divider />
      <Code>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </Code>
    </>
  )
}
export default PluginEditor
