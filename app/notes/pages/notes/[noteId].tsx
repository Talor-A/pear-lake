import React, { Suspense } from "react"
import Layout from "app/layouts/Notes"
import { useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getNote from "app/notes/queries/getNote"
import deleteNote from "app/notes/mutations/deleteNote"
import NoteForm from "app/notes/components/NoteForm"
import Link from "app/components/Link"
import { Box, Button, Heading } from "@chakra-ui/core"
import updateNote from "app/notes/mutations/updateNote"
import { NodeToBlock, BlockToNode } from "app/notes/utils"
import { useToast } from "@chakra-ui/core"
export const Note = () => {
  const router = useRouter()
  const noteId = useParam("noteId", "number")
  const [note, { mutate }] = useQuery(getNote, { where: { id: noteId } })
  const [deleteNoteMutation] = useMutation(deleteNote)
  const [updateNoteMutation] = useMutation(updateNote)
  const toast = useToast()

  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" lineHeight="2xl">
        {note.title}
      </Heading>

      <NoteForm
        nodes={note.blocks.map(BlockToNode)}
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
            toast({ title: "Saved!" })
            router.push("/notes/[noteId]", `/notes/${updated.id}`)
          } catch (error) {
            console.log(error)
            toast({ title: "Error creating note ", status: "error" })
          }
        }}
      />
      <Button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteNoteMutation({ where: { id: note.id } })
            router.push("/notes")
          }
        }}
      >
        Delete
      </Button>
    </Box>
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
