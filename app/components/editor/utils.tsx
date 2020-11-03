import { SlateDocument } from "@udecode/slate-plugins"
import options from "./options"

export const stringToSlate = (s: string) => JSON.parse(s) as SlateDocument

const defaultValue: SlateDocument = [
  {
    children: [
      {
        children: [
          {
            type: options.h1.type,
            text: "",
          },
          {
            type: options.p.type,
            text: "",
          },
        ],
      },
    ],
  },
]

export default defaultValue
