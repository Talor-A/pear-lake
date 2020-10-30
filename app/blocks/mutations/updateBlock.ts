import { Ctx } from "blitz"
import db, { BlockUpdateArgs } from "db"

type UpdateBlockInput = Pick<BlockUpdateArgs, "where" | "data">

export default async function updateBlock({ where, data }: UpdateBlockInput, ctx: Ctx) {
  ctx.session.authorize()

  const block = await db.block.update({ where, data })

  return block
}
