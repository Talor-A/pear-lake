import React, { useMemo } from "react"
import { createEditor } from "slate"
import { Slate } from "slate-react"
import { EditablePlugins, pipe, SlateDocument } from "@udecode/slate-plugins"
import { plugins, withPlugins } from "./plugins"

type EditorProps = {
  value: SlateDocument
  onChange: (value: SlateDocument) => void
}
const Editor = ({ value, onChange }: EditorProps) => {
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => onChange(newValue as SlateDocument)}
    >
      <EditablePlugins
        style={{
          flex: 1,
        }}
        spellCheck
        plugins={plugins}
        placeholder="Enter some text..."
      />
    </Slate>
  )
}
export default Editor
