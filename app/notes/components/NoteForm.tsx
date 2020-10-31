import { Button } from "@chakra-ui/core"
import React, { useMemo, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { createEditor, Node } from "slate"
import PluginEditor from "./PluginEditor"

type NoteFormProps = {
  nodes: Node[]
  onSubmit?: (value: Node[]) => void
  readonly?: boolean
}

const NoteForm = ({ nodes, onSubmit, readonly = false }: NoteFormProps) => {
  const [value, setValue] = useState<Node[]>(
    nodes.length
      ? nodes
      : [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ]
  )

  const onChange = (newValue: Node[]) => {
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
