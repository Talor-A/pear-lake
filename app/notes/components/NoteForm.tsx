import { Button } from "@chakra-ui/core"
import React, { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import PluginEditor from "app/components/editor/Editor"
import { SlateDocument } from "@udecode/slate-plugins"
import defaultValue from "app/components/editor/utils"

type NoteFormProps = {
  document?: SlateDocument
  onSubmit?: (value: SlateDocument) => void
  readonly?: boolean
}

const NoteForm = ({ document, onSubmit, readonly = false }: NoteFormProps) => {
  const [value, setValue] = useState<SlateDocument>(defaultValue)

  const onChange = (newValue: SlateDocument) => {
    setValue(newValue)
  }

  return (
    <>
      <ErrorBoundary fallbackRender={(props) => <p>An error occured rendering.</p>}>
        <PluginEditor value={value} onChange={onChange} />
        {!readonly && <Button onClick={() => onSubmit && onSubmit(value)}>submit</Button>}
      </ErrorBoundary>
    </>
  )
}

export default NoteForm
