import React, { useState } from "react"
import { useRouter, useMutation, BlitzPage } from "blitz"
import { useToast } from "@chakra-ui/core"
import createNote from "app/notes/mutations/createNote"
import NoteForm from "app/notes/components/NoteForm"
import { createBlankDoc, extractTitle } from "app/components/editor/utils"
import Layout from "app/layouts/Notes"

const NotePage: BlitzPage = () => {
  const router = useRouter()
  const [createNoteMutation] = useMutation(createNote)
  const toast = useToast()
  return (
    <NoteForm
      // onAutoSave={() => console.log("autosaved")}
      document={createBlankDoc()}
      onAutoSave={async (doc) => {
        try {
          const note = await createNoteMutation({
            data: {
              title: extractTitle(doc),
              document: JSON.stringify(doc),
            },
          })
          toast({
            position: "top-right",
            status: "success",
            title: "note created",
          })
          router.replace("/notes/[noteId]", `/notes/${note.id}`)
        } catch (error) {
          alert("Error creating note " + JSON.stringify(error, null, 2))
        }
      }}
    />
  )
}

NotePage.getLayout = (page) => <Layout title={"Notes"}>{page}</Layout>

export default NotePage
