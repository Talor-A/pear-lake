import { Ctx } from "blitz"
import db, { FindManyBlockArgs } from "db"

type GetBlocksInput = Pick<FindManyBlockArgs, "where" | "orderBy" | "skip" | "take">

export default async function getBlocks(
  { where, orderBy, skip = 0, take }: GetBlocksInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const blocks = await db.block.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.block.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    blocks,
    nextPage,
    hasMore,
    count,
  }
}
