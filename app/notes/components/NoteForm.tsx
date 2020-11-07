import React, { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import PluginEditor from "app/components/editor/Editor"
import { SlateDocument } from "@udecode/slate-plugins"
import defaultValue, { extractTitle } from "app/components/editor/utils"
import { useDebouncedCallback } from "use-debounce"

type NoteFormProps = {
  document?: SlateDocument
  onSubmit?: (value: SlateDocument) => void
  onAutoSave?: (value: SlateDocument) => void
  readonly?: boolean
}

const NoteForm = ({ document, onSubmit, onAutoSave, readonly = false }: NoteFormProps) => {
  const [value, setValue] = useState<SlateDocument>(document || defaultValue)

  const { callback } = useDebouncedCallback((value) => {
    onAutoSave && onAutoSave(value)
  }, 1000)

  const handleChange = (newValue: SlateDocument) => {
    setValue((prev) => {
      if (prev !== newValue) callback(newValue)
      return newValue
    })
  }

  return (
    <div>
      <ErrorBoundary fallbackRender={(props) => <p>An error occured rendering.</p>}>
        <PluginEditor value={value} onChange={handleChange} />
        {!readonly && onSubmit && <button onClick={() => onSubmit(value)}>submit</button>}
        {/* <hr />
        <code>
          Title: {extractTitle(value)}
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </code> */}
      </ErrorBoundary>
    </div>
  )
}

export default NoteForm
