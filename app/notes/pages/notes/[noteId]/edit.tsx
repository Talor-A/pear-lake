import React, { Suspense } from "react"
import Layout from "app/layouts/Notes"
import { useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getNote from "app/notes/queries/getNote"
import updateNote from "app/notes/mutations/updateNote"
import NoteForm from "app/notes/components/NoteForm"
import { NodeToBlock, BlockToNode } from "app/notes/utils"
import Link from "app/components/Link"
import { stringToSlate } from "app/components/editor/utils"

export const EditNote = () => {
  const router = useRouter()
  const noteId = useParam("noteId", "number")
  const [note, { mutate }] = useQuery(getNote, { where: { id: noteId } })
  const [updateNoteMutation] = useMutation(updateNote)

  return (
    <div>
      <h1>Edit Note {note.id}</h1>

      <NoteForm
        document={stringToSlate(note.document)}
        onSubmit={async (editorBlocks) => {
          try {
            const updated = await updateNoteMutation({
              where: { id: note.id },
              data: {
                title: "myNewTitle",
                blocks: {
                  deleteMany: { noteId: note.id },
                  create: editorBlocks.map(NodeToBlock),
                },
              },
            })
            await mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/notes/[noteId]", `/notes/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating note " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditNotePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditNote />
      </Suspense>

      <p>
        <Link href="/notes">Notes </Link>
      </p>
    </div>
  )
}

EditNotePage.getLayout = (page) => <Layout title={"Edit Note"}>{page}</Layout>

export default EditNotePage
