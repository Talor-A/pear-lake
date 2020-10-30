import React, { Suspense } from "react"
import { usePaginatedQuery, useRouter, BlitzPage, useParam, useQuery } from "blitz"
import getNotes from "app/notes/queries/getMyNotes"
import Link from "app/components/Link"
import { Box, Button, Stack, Text, useColorMode } from "@chakra-ui/core"
import Layout, { LayoutProps } from "./Layout"
import { render } from "@testing-library/react"
import { Block } from "@prisma/client"
import { NoteWithBlocks } from "app/notes/utils"

const ITEMS_PER_PAGE = 100
type NoteProps = {
  note: NoteWithBlocks
  active: boolean
}
const Note = ({ note, active }: NoteProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const selectedColor = { light: "blue.200", dark: "blue.500" }
  const hoverColor = { light: "blue.100", dark: "blue.400" }

  return (
    <Link
      boxSizing={"border-box"}
      borderLeftColor={active ? selectedColor[colorMode] : "transparent"}
      borderLeftWidth={4}
      _hover={{ bg: "#00000008", borderLeftColor: active ? undefined : hoverColor[colorMode] }}
      href="/notes/[noteId]"
      as={`/notes/${note.id}`}
    >
      <Box p={4} h={100} overflow={"none"} key={note.id}>
        <Text fontSize={"lg"}>{note.title}</Text>
        <Stack>
          {note.blocks.map((block) => (
            <Text opacity={0.65} key={block.id}>
              {block.content}
            </Text>
          ))}
        </Stack>
      </Box>
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
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <em>No Notes</em>
      </Box>
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
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = { light: "gray.50", dark: "gray.800" }
  // const color = { light: "white", dark: "gray.800" };

  const router = useRouter()

  return (
    <Layout title={title}>
      <Stack h={"100vh"} minW={400} bg={bgColor[colorMode]}>
        <Suspense fallback="Loading..">
          <NotesList />
        </Suspense>
      </Stack>
      {children}
    </Layout>
  )
}

export default NotesLayout
