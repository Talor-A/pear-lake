import { BlitzPage, useMutation } from "blitz"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"
import Link from "app/components/Link"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <div /* h={"100vh"} isInline justify="center" align="center" */>
        <Link href="/signup">
          <button>Sign Up</button>
        </Link>
        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <UserInfo />
    </Suspense>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
