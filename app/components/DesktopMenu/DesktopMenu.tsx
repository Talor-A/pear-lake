import { useState } from "react"
import Link from "../Link"
import styles from "./DesktopMenu.module.css"

const DesktopMenu = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menuHeader}>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/notes">notes</Link>
        </li>
      </ul>
      <div className={styles.menuMain}>{children}</div>
    </div>
  )
}

export default DesktopMenu
