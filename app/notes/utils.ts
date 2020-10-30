import { Block, Note } from "@prisma/client"
import { Node } from "slate"

export type NoteWithBlocks = Note & {
  blocks: Block[]
}

export const NodeToBlock = (node: Node) => ({
  data: JSON.stringify(node),
  content: Node.string(node),
})
export const BlockToNode = (nb: Block) => ({ ...JSON.parse(nb.data || "{}"), id: nb.id })
