import { PropsWithChildren } from "react"
import NextLink from "next/link"
import { LinkProps as NextLinkProps } from "next/dist/client/link"

export const CustomLink = ({ children, ...props }: PropsWithChildren<NextLinkProps>) => {
  return <NextLink {...props}>{children}</NextLink>
}
export default CustomLink
