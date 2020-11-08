import React, { Suspense } from "react"
import { useParam, useQuery } from "blitz"
import getNotes from "app/notes/queries/getMyNotes"
import Link from "app/components/Link"
import Layout, { LayoutProps } from "./Layout"
import { NoteWithBlocks } from "app/notes/utils"
import { Col } from "app/components/layout"
import styles from "./layout.module.css"

const ITEMS_PER_PAGE = 100
type NoteProps = {
  note: NoteWithBlocks
  active: boolean
}
const Note = ({ note, active }: NoteProps) => {
  return (
    <li
    // p={4}
    // h={100}
    // overflow={"none"}
    // borderBottomWidth={1}
    // borderColor={borderColor[colorMode]}
    >
      <Link href="/notes/[noteId]" as={`/notes/${note.id}`}>
        <a /* fontSize={"lg"} */>{note.title}</a>
      </Link>
    </li>
  )
}

const NotesList = () => {
  const [{ notes, hasMore }] = useQuery(getNotes, {
    orderBy: { updatedAt: "asc" },
  })
  const noteId = useParam("noteId", "number")

  const isActive = (note: NoteWithBlocks) => noteId === note.id
  if (!notes.length)
    return (
      <Col className={styles.center}>
        <em>No Notes</em>
        <Link href="/notes/new">
          <button>Create one</button>
        </Link>
      </Col>
    )
  return (
    <ul>
      {notes.map((note) => (
        <Note key={note.id} active={isActive(note)} note={note} />
      ))}
    </ul>
  )
}

export const NotesLayout = ({ title, children }: LayoutProps) => {
  return (
    <Layout
      title={title}
      sidemenu={
        <Suspense fallback="Loading..">
          <NotesList />
        </Suspense>
      }
    >
      {children}
    </Layout>
  )
}

export default NotesLayout
