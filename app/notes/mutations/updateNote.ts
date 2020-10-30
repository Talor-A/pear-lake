import { Ctx } from "blitz"
import db, { NoteUpdateArgs } from "db"

type UpdateNoteInput = Pick<NoteUpdateArgs, "where" | "data">

export default async function updateNote({ where, data }: UpdateNoteInput, ctx: Ctx) {
  ctx.session.authorize()

  const note = await db.note.update({ where, data, include: { blocks: true } })

  return note
}
