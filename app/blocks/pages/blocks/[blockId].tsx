import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getBlock from "app/blocks/queries/getBlock"
import deleteBlock from "app/blocks/mutations/deleteBlock"
import Link from "app/components/Link"

export const Block = () => {
  const router = useRouter()
  const blockId = useParam("blockId", "number")
  const [block] = useQuery(getBlock, { where: { id: blockId } })
  const [deleteBlockMutation] = useMutation(deleteBlock)

  return (
    <div>
      <h1>Block {block.id}</h1>
      <pre>{JSON.stringify(block, null, 2)}</pre>

      <Link href="/blocks/[blockId]/edit" as={`/blocks/${block.id}/edit`}>
        Edit
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteBlockMutation({ where: { id: block.id } })
            router.push("/blocks")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowBlockPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/blocks">Blocks</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Block />
      </Suspense>
    </div>
  )
}

ShowBlockPage.getLayout = (page) => <Layout title={"Block"}>{page}</Layout>

export default ShowBlockPage
