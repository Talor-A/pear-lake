import React, { Suspense } from "react"
import Layout from "app/layouts/Notes"
import { BlitzPage } from "blitz"
import Link from "app/components/Link"

const NotesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/notes/markdown">
          <button>Markdown Example</button>
        </Link>
        <Link href="/notes/plugins">
          <button>Plugins Example</button>
        </Link>
      </p>
    </div>
  )
}

NotesPage.getLayout = (page) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Layout title={"Notes"}>{page}</Layout>
  </Suspense>
)

export default NotesPage
