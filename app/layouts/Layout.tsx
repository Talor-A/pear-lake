import { ReactNode } from "react"
import { Head } from "blitz"
import { Stack, useColorMode } from "@chakra-ui/core"
import DesktopMenu from "app/components/DesktopMenu"

export type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = { light: "white", dark: "gray.700" }
  // const color = { light: "white", dark: "gray.800" };

  return (
    <>
      <Head>
        <title>{title || "pear-lake"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export default Layout
