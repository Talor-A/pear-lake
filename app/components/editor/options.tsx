import {
  DEFAULTS_PARAGRAPH,
  DEFAULTS_BOLD,
  DEFAULTS_UNDERLINE,
  DEFAULTS_ITALIC,
  DEFAULTS_HEADING,
  DEFAULTS_CODE_BLOCK,
  DEFAULTS_LIST,
  DEFAULTS_TODO_LIST,
  DEFAULTS_BLOCKQUOTE,
} from "@udecode/slate-plugins"

const HEADING_OPTIONS = {
  levels: 3,
  h1: {
    component: "h1",
    type: "h1",
  },
  h2: {
    component: "h2",
    type: "h2",
  },
  h3: {
    component: "h3",
    type: "h3",
  },
} as const

const options = {
  ...HEADING_OPTIONS,
  ...DEFAULTS_PARAGRAPH,
  ...DEFAULTS_BOLD,
  ...DEFAULTS_UNDERLINE,
  ...DEFAULTS_ITALIC,
  ...DEFAULTS_LIST,
  ...DEFAULTS_TODO_LIST,
  ...DEFAULTS_BLOCKQUOTE,
  ...DEFAULTS_CODE_BLOCK,
}
export const resetBlockTypesCommonRule = {
  types: [
    options.bold.type,
    options.code_block.type,
    options.todo_li.type,
    options.h1.type,
    options.h2.type,
    options.h3.type,
  ],
  defaultType: options.p.type,
}

export default options
