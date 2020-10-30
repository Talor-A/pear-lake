import { Ctx } from "blitz"
import db, { FindManyNoteArgs } from "db"
import { NoteWithBlocks } from "../utils"

type GetNotesInput = Pick<FindManyNoteArgs, "where" | "orderBy" | "skip" | "take">

export default async function getMyNotes(
  { where, orderBy, skip = 0, take }: GetNotesInput,
  { session }: Ctx
) {
  if (!session.userId) return { notes: [] as NoteWithBlocks[] }

  const user = await db.user.findOne({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      notes: { orderBy, where, take, skip, include: { blocks: true } },
    },
  })

  const notes = user?.notes || []
  const count = user?.notes.length || 0
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    notes,
    nextPage,
    hasMore,
    count,
  }
}
