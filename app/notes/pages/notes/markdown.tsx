import React, { Suspense } from "react"
import Layout from "app/layouts/Notes"
import { BlitzPage } from "blitz"
import { Stack } from "@chakra-ui/core"
import MarkdownPreviewExample from "app/notes/components/MarkdownEditor"

const NotesPage: BlitzPage = () => {
  return (
    <Stack>
      <p>Markdown Example</p>
      <MarkdownPreviewExample />
    </Stack>
  )
}

NotesPage.getLayout = (page) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Layout title={"Markdown Example"}>{page}</Layout>
  </Suspense>
)

export default NotesPage
