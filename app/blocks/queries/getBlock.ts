import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstBlockArgs } from "db"

type GetBlockInput = Pick<FindFirstBlockArgs, "where">

export default async function getBlock({ where }: GetBlockInput, ctx: Ctx) {
  ctx.session.authorize()

  const block = await db.block.findFirst({ where })

  if (!block) throw new NotFoundError()

  return block
}
