import { Ctx } from "blitz"
import db, { BlockCreateArgs } from "db"

type CreateBlockInput = Pick<BlockCreateArgs, "data">
export default async function createBlock({ data }: CreateBlockInput, ctx: Ctx) {
  ctx.session.authorize()

  const block = await db.block.create({ data })

  return block
}
