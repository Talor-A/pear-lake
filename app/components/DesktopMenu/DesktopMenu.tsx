import { useState } from "react"
import Link from "../Link"
import styles from "./DesktopMenu.module.css"

const DesktopMenu = () => {
  return (
    <ul className={styles.menu}>
      <li>
        <Link href="/">home</Link>
      </li>
      <li>
        <Link href="/notes">notes</Link>
      </li>
    </ul>
  )
}

export default DesktopMenu
