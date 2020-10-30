import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getProject from "app/projects/queries/getProject"
import deleteProject from "app/projects/mutations/deleteProject"
import Link from "app/components/Link"

export const Project = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [project] = useQuery(getProject, { where: { id: projectId } })
  const [deleteProjectMutation] = useMutation(deleteProject)

  return (
    <div>
      <h1>Project {project.id}</h1>
      <pre>{JSON.stringify(project, null, 2)}</pre>

      <Link href="/projects/[projectId]/edit" as={`/projects/${project.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteProjectMutation({ where: { id: project.id } })
            router.push("/projects")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowProjectPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Project />
      </Suspense>
    </div>
  )
}

ShowProjectPage.getLayout = (page) => <Layout title={"Project"}>{page}</Layout>

export default ShowProjectPage
