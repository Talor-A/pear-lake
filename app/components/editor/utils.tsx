import { Text } from "slate"
import {
  ArrayOneOrMore,
  HeadingKeyOption,
  SlateDocument,
  SlateDocumentDescendant,
  SlateDocumentElement,
} from "@udecode/slate-plugins"
import options from "./options"

export interface HeadingBlock extends SlateDocumentElement {
  type: HeadingKeyOption
  children: ArrayOneOrMore<Text>
}
export const isNotText = (data: SlateDocumentDescendant): data is SlateDocumentElement => {
  return Array.isArray(data.children) && data.children.length > 0
}
export const isHeader = (data: SlateDocumentDescendant): data is HeadingBlock => {
  return isNotText(data) && data.type === options.h1.type && data.children.length === 1
}

export const stringToSlate = (s: string) => JSON.parse(s) as SlateDocument
export const extractTitle = (d: SlateDocument): string => {
  const contentArray = d[0].children
  const firstChild = contentArray[0]
  if (isHeader(firstChild)) {
    return firstChild.children[0].text
  }
  return "Untitled Document"
}
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

const prettyDate = (date: Date) => {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
export const createBlankDoc = (title?: string, content: string = ""): SlateDocument => [
  {
    children: [
      {
        type: options.h1.type,
        children: [{ text: title || prettyDate(new Date()) }],
      },
      {
        type: options.p.type,
        children: [
          {
            text: content,
          },
        ],
      },
    ],
  },
]

const defaultValue: SlateDocument = createBlankDoc("", "")

export default defaultValue
