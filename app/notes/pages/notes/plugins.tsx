import React, { Suspense, useState } from "react"
import Layout from "app/layouts/Notes"
import { BlitzPage } from "blitz"
import { Stack } from "@chakra-ui/core"
import MarkdownPreviewExample from "app/notes/components/PluginEditor"
import PluginEditor from "app/notes/components/PluginEditor"
import { Node } from "slate"

const NotesPage: BlitzPage = () => {
  const [value, setValue] = useState<Node[]>([])
  return (
    <Stack>
      <p>Markdown Example</p>
      <PluginEditor value={value} onChange={setValue} />
    </Stack>
  )
}

NotesPage.getLayout = (page) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Layout title={"Plugins Example"}>{page}</Layout>
  </Suspense>
)

export default NotesPage
