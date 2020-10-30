import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstNoteArgs } from "db"

type GetNoteInput = Pick<FindFirstNoteArgs, "where">

export default async function getNote({ where }: GetNoteInput, ctx: Ctx) {
  ctx.session.authorize()

  const note = await db.note.findFirst({ where, include: { blocks: true } })

  if (!note) throw new NotFoundError()

  return note
}
