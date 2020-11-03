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

const options = {
  ...DEFAULTS_PARAGRAPH,
  ...DEFAULTS_BOLD,
  ...DEFAULTS_UNDERLINE,
  ...DEFAULTS_ITALIC,
  ...DEFAULTS_HEADING,
  ...DEFAULTS_LIST,
  ...DEFAULTS_TODO_LIST,
  ...DEFAULTS_BLOCKQUOTE,
  ...DEFAULTS_CODE_BLOCK,
}
export const resetBlockTypesCommonRule = {
  types: [options.bold.type, options.code_block.type, options.todo_li.type],
  defaultType: options.p.type,
}

export default options
