import React, { Suspense } from "react"
import Layout from "app/layouts/Notes"
import { usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getNotes from "app/notes/queries/getMyNotes"
import Link from "app/components/Link"
import { Box, Button, Stack, Text } from "@chakra-ui/core"
import MarkdownPreviewExample from "app/notes/components/MarkdownEditor"

const ITEMS_PER_PAGE = 100

const NotesPage: BlitzPage = () => {
  return (
    <Stack>
      <p>
        <Link href="/notes/new">Create Note</Link>
      </p>
      <MarkdownPreviewExample />
    </Stack>
  )
}

NotesPage.getLayout = (page) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Layout title={"Notes"}>{page}</Layout>
  </Suspense>
)

export default NotesPage
