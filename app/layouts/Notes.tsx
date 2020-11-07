import React, { Suspense } from "react"
import { usePaginatedQuery, useRouter, BlitzPage, useParam, useQuery } from "blitz"
import getNotes from "app/notes/queries/getMyNotes"
import Link from "app/components/Link"
import Layout, { LayoutProps } from "./Layout"
import { render } from "@testing-library/react"
import { Block } from "@prisma/client"
import { NoteWithBlocks } from "app/notes/utils"
import { Row, Col } from "app/components/layout"
import styles from "./layout.module.css"

const ITEMS_PER_PAGE = 100
type NoteProps = {
  note: NoteWithBlocks
  active: boolean
}
const Note = ({ note, active }: NoteProps) => {
  return (
    <Link href="/notes/[noteId]" as={`/notes/${note.id}`}>
      <div
        key={note.id}
        // p={4}
        // h={100}
        // overflow={"none"}
        // borderBottomWidth={1}
        // borderColor={borderColor[colorMode]}
      >
        <span /* fontSize={"lg"} */>{note.title}</span>
        <div>
          {note.blocks.map((block) => (
            <span /* opacity={0.65}  */ key={block.id}>{block.content}</span>
          ))}
        </div>
      </div>
    </Link>
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
    <>
      {notes.map((note) => (
        <Note key={note.id} active={isActive(note)} note={note} />
      ))}
    </>
  )
}

export const NotesLayout = ({ title, children }: LayoutProps) => {
  return (
    <Layout
      title={title}
      sidemenu={
        <div /* h={"100vh"} minW={400} bg={bgColor[colorMode]} */>
          <Suspense fallback="Loading..">
            <NotesList />
          </Suspense>
        </div>
      }
    >
      {children}
    </Layout>
  )
}

export default NotesLayout
