import { Ctx } from "blitz"
import db, { NoteCreateArgs, NoteCreateInput } from "db"

type CreateNoteInput = Pick<NoteCreateArgs, "data">

type CustomCreate = {
  data: Omit<NoteCreateInput, "user">
}
export default async function createNote({ data }: CustomCreate, ctx: Ctx) {
  ctx.session.authorize()

  const note = await db.note.create({
    data: {
      ...data,
      user: {
        connect: {
          id: ctx.session.userId,
        },
      },
    },
  })

  return note
}
