import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Link from "app/components/Link"
import getBlocks from "app/blocks/queries/getBlocks"

const ITEMS_PER_PAGE = 100

export const BlocksList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ blocks, hasMore }] = usePaginatedQuery(getBlocks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {blocks.map((block) => (
          <li key={block.id}>
            <Link href="/blocks/[blockId]" as={`/blocks/${block.id}`}>
              {block.content}
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const BlocksPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/blocks/new">Create Block</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <BlocksList />
      </Suspense>
    </div>
  )
}

BlocksPage.getLayout = (page) => <Layout title={"Blocks"}>{page}</Layout>

export default BlocksPage
