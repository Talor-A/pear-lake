import React from "react"
import Layout from "app/layouts/Layout"
import { useRouter, useMutation, BlitzPage } from "blitz"
import createBlock from "app/blocks/mutations/createBlock"
import BlockForm from "app/blocks/components/BlockForm"
import Link from "app/components/Link"

const NewBlockPage: BlitzPage = () => {
  const router = useRouter()
  const [createBlockMutation] = useMutation(createBlock)

  return (
    <div>
      <h1>Create New Block</h1>

      {/* <BlockForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const block = await createBlockMutation({ data: { content: "MyContent" } })
            alert("Success!" + JSON.stringify(block))
            router.push("/blocks/[blockId]", `/blocks/${block.id}`)
          } catch (error) {
            alert("Error creating block " + JSON.stringify(error, null, 2))
          }
        }}
      /> */}

      <p>
        <Link href="/blocks">Blocks</Link>
      </p>
    </div>
  )
}

NewBlockPage.getLayout = (page) => <Layout title={"Create New Block"}>{page}</Layout>

export default NewBlockPage
