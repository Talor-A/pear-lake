import { Button } from "@chakra-ui/core"
import React, { useMemo, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"

type NoteFormProps = {
  nodes: Node[]
  onSubmit?: (value: Node[]) => void
  readonly?: boolean
}

const NoteForm = ({ nodes, onSubmit, readonly = false }: NoteFormProps) => {
  const editor = useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
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
        <Slate editor={editor} value={value} onChange={onChange}>
          <Editable readOnly={readonly} />
        </Slate>
        {!readonly && <Button onClick={() => onSubmit && onSubmit(value)}>submit</Button>}
      </ErrorBoundary>
    </>
  )
}

export default NoteForm
