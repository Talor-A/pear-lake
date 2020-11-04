import { SlateDocument } from "@udecode/slate-plugins"
import React, { useMemo } from "react"
import { createEditor } from "slate"
import { Slate, Editable, withReact } from "slate-react"

type EditorProps = {
  value: SlateDocument
  onChange: (value: SlateDocument) => void
}

const Editor = ({ value, onChange }: EditorProps) => {
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => onChange(newValue as SlateDocument)}
    >
      <Editable />
    </Slate>
  )
}
export default Editor
