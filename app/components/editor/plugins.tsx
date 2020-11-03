import {
  ParagraphPlugin,
  HeadingPlugin,
  CodeBlockPlugin,
  ResetBlockTypePlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  withList,
  withToggleType,
  withAutoformat,
  unwrapList,
  AutoformatRule,
  toggleList,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ExitBreakPlugin,
  BlockquotePlugin,
  ListPlugin,
  withNormalizeTypes,
  withTrailingNode,
  withTransforms,
} from "@udecode/slate-plugins"
import { withHistory } from "slate-history"
import { withReact } from "slate-react"

import options, { resetBlockTypesCommonRule } from "./options"

export const plugins = [
  ParagraphPlugin(options),
  HeadingPlugin({
    levels: 3,
  }),
  CodeBlockPlugin(options),
  BlockquotePlugin(options),
  ListPlugin(options),
  ResetBlockTypePlugin({
    rules: [
      {
        ...resetBlockTypesCommonRule,
        hotkey: "Enter",
        predicate: isBlockAboveEmpty,
      },
      {
        ...resetBlockTypesCommonRule,
        hotkey: "Backspace",
        predicate: isSelectionAtBlockStart,
      },
    ],
  }),
  ExitBreakPlugin({
    rules: [
      {
        hotkey: "mod+enter",
      },
      {
        hotkey: "mod+shift+enter",
        before: true,
      },
      {
        hotkey: "enter",
        query: {
          start: true,
          end: true,
          allow: [ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
        },
      },
    ],
  }),
]

const preFormat = (editor) => unwrapList(editor, options)

const autoformatRules: AutoformatRule[] = [
  {
    type: options.h1.type,
    markup: "#",
    preFormat,
  },
  {
    type: options.h2.type,
    markup: "##",
    preFormat,
  },
  {
    type: options.h3.type,
    markup: "###",
    preFormat,
  },
  {
    type: options.h3.type,
    markup: "####",
    preFormat,
  },
  {
    type: options.h3.type,
    markup: "#####",
    preFormat,
  },
  {
    type: options.h3.type,
    markup: "######",
    preFormat,
  },
  {
    type: options.li.type,
    markup: ["*", "-"],
    preFormat,
    format: (editor) => {
      toggleList(editor, { ...options, typeList: options.ul.type })
    },
  },
  {
    type: options.li.type,
    markup: ["1.", "1)"],
    preFormat,
    format: (editor) => {
      toggleList(editor, { ...options, typeList: options.ol.type })
    },
  },
  {
    type: options.todo_li.type,
    markup: ["[]"],
  },
  {
    type: options.blockquote.type,
    markup: [">"],
    preFormat,
  },
  {
    trigger: "`",
    type: options.code_block.type,
    markup: "``",
    mode: "inline-block",
    preFormat: (editor) => unwrapList(editor, options),
  },
]
export const withPlugins = [
  withReact,
  withHistory,
  withList(options),
  withTransforms(),
  withToggleType({ defaultType: options.p.type }),
  withAutoformat({
    rules: autoformatRules,
  }),
  withNormalizeTypes({
    rules: [{ path: [0, 0], strictType: options.h1.type }],
  }),
  withTrailingNode({ type: options.p.type }),
] as const
