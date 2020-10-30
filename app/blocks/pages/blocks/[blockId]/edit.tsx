import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getBlock from "app/blocks/queries/getBlock"
import updateBlock from "app/blocks/mutations/updateBlock"
import BlockForm from "app/blocks/components/BlockForm"
import Link from "app/components/Link"

export const EditBlock = () => {
  const router = useRouter()
  const blockId = useParam("blockId", "number")
  const [block, { mutate }] = useQuery(getBlock, { where: { id: blockId } })
  const [updateBlockMutation] = useMutation(updateBlock)

  return (
    <div>
      <h1>Edit Block {block.id}</h1>
      <pre>{JSON.stringify(block)}</pre>

      <BlockForm
        initialValues={block}
        onSubmit={async () => {
          try {
            const updated = await updateBlockMutation({
              where: { id: block.id },
              data: { content: "myNewContent" },
            })
            await mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/blocks/[blockId]", `/blocks/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating block " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditBlockPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBlock />
      </Suspense>

      <p>
        <Link href="/blocks">Blocks</Link>
      </p>
    </div>
  )
}

EditBlockPage.getLayout = (page) => <Layout title={"Edit Block"}>{page}</Layout>

export default EditBlockPage
