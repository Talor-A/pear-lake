import { Ctx } from "blitz"
import db, { BlockDeleteArgs } from "db"

type DeleteBlockInput = Pick<BlockDeleteArgs, "where">

export default async function deleteBlock({ where }: DeleteBlockInput, ctx: Ctx) {
  ctx.session.authorize()

  const block = await db.block.delete({ where })

  return block
}
