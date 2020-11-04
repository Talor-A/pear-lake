import { Button, Code, Divider, Stack } from "@chakra-ui/core"
import React, { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import PluginEditor from "app/components/editor/BasicEditor"
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
    <Stack>
      <ErrorBoundary fallbackRender={(props) => <p>An error occured rendering.</p>}>
        <PluginEditor value={value} onChange={onChange} />
        {!readonly && <Button onClick={() => onSubmit && onSubmit(value)}>submit</Button>}
        <Divider />
        <Code>
          Title: {extractTitle(value)}
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </Code>
      </ErrorBoundary>
    </Stack>
  )
}

export default NoteForm
