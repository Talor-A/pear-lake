import React, { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import PluginEditor from "app/components/editor/Editor"
import { SlateDocument } from "@udecode/slate-plugins"
import defaultValue, { extractTitle } from "app/components/editor/utils"

type NoteFormProps = {
  document?: SlateDocument
  onSubmit?: (value: SlateDocument) => void
  readonly?: boolean
}

const NoteForm = ({ document, onSubmit, readonly = false }: NoteFormProps) => {
  const [value, setValue] = useState<SlateDocument>(document || defaultValue)

  const onChange = (newValue: SlateDocument) => {
    setValue(newValue)
  }

  return (
    <div>
      <ErrorBoundary fallbackRender={(props) => <p>An error occured rendering.</p>}>
        <PluginEditor value={value} onChange={onChange} />
        {!readonly && <button onClick={() => onSubmit && onSubmit(value)}>submit</button>}
        <hr />
        <code>
          Title: {extractTitle(value)}
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </code>
      </ErrorBoundary>
    </div>
  )
}

export default NoteForm
