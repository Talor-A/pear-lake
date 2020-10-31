import React, { Suspense } from "react"
import Layout from "app/layouts/Notes"
import { BlitzPage } from "blitz"
import Link from "app/components/Link"
import { Button, Stack } from "@chakra-ui/core"

const NotesPage: BlitzPage = () => {
  return (
    <Stack>
      <p>
        <Link href="/notes/markdown">
          <Button>Markdown Example</Button>
        </Link>
        <Link href="/notes/plugins">
          <Button>Plugins Example</Button>
        </Link>
      </p>
    </Stack>
  )
}

NotesPage.getLayout = (page) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Layout title={"Notes"}>{page}</Layout>
  </Suspense>
)

export default NotesPage
