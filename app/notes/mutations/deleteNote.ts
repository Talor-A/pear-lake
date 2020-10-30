import { Ctx } from "blitz"
import db, { NoteDeleteArgs } from "db"

type DeleteNoteInput = Pick<NoteDeleteArgs, "where">

export default async function deleteNote({ where }: DeleteNoteInput, ctx: Ctx) {
  ctx.session.authorize()

  await db.block.deleteMany({ where: { note: { id: where.id } } })
  const note = await db.note.delete({ where })

  return note
}
