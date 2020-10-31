import React, { ReactNode } from "react"
import { Head } from "blitz"
import { Flex, Link, Stack, useColorMode } from "@chakra-ui/core"
import DesktopMenu from "app/components/DesktopMenu"
export type LayoutProps = {
  title?: string
  children: ReactNode
  sidemenu?: ReactNode
}

const Layout = ({ title, children, sidemenu }: LayoutProps) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: "white", dark: "gray.700" }
  // const color = { light: "white", dark: "gray.800" };

  return (
    <>
      <Head>
        <title>{title || "pear-lake"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex bg={"gray.500"} color={"white"}>
        <Link color="white" href="/">
          Home
        </Link>
        <Link color="white" href="/notes">
          Notes
        </Link>
      </Flex>
      <Stack bg={bgColor[colorMode]} flex={1} isInline alignItems="stretch">
        <DesktopMenu />
        {sidemenu}
        <main>{children}</main>
      </Stack>
    </>
  )
}

export default Layout
