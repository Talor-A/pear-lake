import React, { Suspense } from "react"
import Layout from "app/layouts/Notes"
import { useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getNote from "app/notes/queries/getNote"
import deleteNote from "app/notes/mutations/deleteNote"
import NoteForm from "app/notes/components/NoteForm"
import Link from "app/components/Link"
import updateNote from "app/notes/mutations/updateNote"
import { useToast } from "@chakra-ui/core"
import { SlateDocument } from "@udecode/slate-plugins"

export const Note = () => {
  const router = useRouter()
  const noteId = useParam("noteId", "number")
  const [note, { mutate }] = useQuery(getNote, { where: { id: noteId } })
  const [deleteNoteMutation] = useMutation(deleteNote)
  const [updateNoteMutation] = useMutation(updateNote)
  const toast = useToast()
  let doc: SlateDocument | undefined
  try {
    doc = JSON.parse(note.document) as SlateDocument
  } catch (err) {
    console.error(err)
  }
  return (
    <>
      {doc && (
        <NoteForm
          document={doc}
          onSubmit={async (doc) => {
            try {
              const updated = await updateNoteMutation({
                where: { id: note.id },
                data: {
                  title: doc[0].children[0].text as string,
                  document: JSON.stringify(doc),
                },
              })
              await mutate(updated)
              toast({ title: "Saved!" })
              router.push("/notes/[noteId]", `/notes/${updated.id}`)
            } catch (error) {
              console.log(error)
              toast({ title: "Error creating note ", status: "error" })
            }
          }}
        />
      )}

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteNoteMutation({ where: { id: note.id } })
            router.push("/notes")
          }
        }}
      >
        Delete
      </button>
    </>
  )
}

const ShowNotePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/notes">Notes</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Note />
      </Suspense>
    </div>
  )
}

ShowNotePage.getLayout = (page) => <Layout title={"Note"}>{page}</Layout>

export default ShowNotePage
