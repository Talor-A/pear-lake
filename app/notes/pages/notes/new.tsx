import React, { useState } from "react"
import Layout from "app/layouts/Layout"
import { useRouter, useMutation, BlitzPage } from "blitz"
import createNote from "app/notes/mutations/createNote"
import NoteForm from "app/notes/components/NoteForm"
import Link from "app/components/Link"
import { createBlankDoc, extractTitle } from "app/components/editor/utils"

const NewNotePage: BlitzPage = () => {
  const router = useRouter()
  const [createNoteMutation] = useMutation(createNote)
  return (
    <div>
      <h1>Create New Note</h1>

      <NoteForm
        document={createBlankDoc()}
        onSubmit={async (doc) => {
          try {
            const note = await createNoteMutation({
              data: {
                title: extractTitle(doc),
                document: JSON.stringify(doc),
              },
            })
            alert("Success!" + JSON.stringify(note))
            router.push("/notes/[noteId]", `/notes/${note.id}`)
          } catch (error) {
            alert("Error creating note " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/notes">Notes</Link>
      </p>
    </div>
  )
}

NewNotePage.getLayout = (page) => <Layout title={"Create New Note"}>{page}</Layout>

export default NewNotePage
