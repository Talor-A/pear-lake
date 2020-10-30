import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { useQuery, useParam, BlitzPage } from "blitz"
import getUser from "app/users/queries/getUser"
import Link from "app/components/Link"

export const User = () => {
  // const router = usseRouter()
  const userId = useParam("userId", "number")
  const [user] = useQuery(getUser, { where: { id: userId } })
  // const [deleteUserMutation] = useMutation(deleteUser)

  return (
    <div>
      <h1>User {user.id}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <Link href="/users/[userId]/edit" as={`/users/${user.id}/edit`}>
        <a>Edit</a>
      </Link>
      {/* 
      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteUserMutation({ where: { id: user.id } })
            router.push("/users")
          }
        }}
      >
        Delete
      </button> */}
    </div>
  )
}

const ShowUserPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/users">
          <a>Users</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <User />
      </Suspense>
    </div>
  )
}

ShowUserPage.getLayout = (page) => <Layout title={"User"}>{page}</Layout>

export default ShowUserPage
