import { Ctx } from "blitz"
import db, { FindManyNoteArgs } from "db"

type GetNotesInput = Pick<FindManyNoteArgs, "where" | "orderBy" | "skip" | "take">

export default async function getNotes(
  { where, orderBy, skip = 0, take }: GetNotesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const notes = await db.note.findMany({
    where,
    orderBy,
    take,
    skip,
    include: { blocks: true },
  })

  const count = await db.note.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    notes,
    nextPage,
    hasMore,
    count,
  }
}
