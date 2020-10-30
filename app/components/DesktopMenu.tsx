import { useState } from "react"
import { Button, IconButton, IconButtonProps, Stack, useColorMode } from "@chakra-ui/core"
import Link from "./Link"

const Item = (props: IconButtonProps) => (
  <IconButton _hover={{ bg: "gray.600" }} bg="transparent" color="gray.100" {...props}></IconButton>
)

const DesktopMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = { light: "gray.700", dark: "gray.900" }
  return (
    <Stack h={"100vh"} bg={bgColor[colorMode]}>
      <Link href="notes">
        <Item aria-label="notes" icon="edit" />
      </Link>
      <Item
        aria-label={colorMode === "light" ? "Dark" : "Light"}
        icon="moon"
        onClick={() => toggleColorMode()}
      />
    </Stack>
  )
}

export default DesktopMenu
