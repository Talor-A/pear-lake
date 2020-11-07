import { useState } from "react"
import Link from "../Link"
import styles from "./DesktopMenu.module.scss"

const DesktopMenu = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className={styles.menu}>
      <div className={styles.menuHeader}>
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/notes">notes</Link>
          </li>
        </ul>
      </div>
      <div className={styles.menuMain}>{children}</div>
    </div>
  )
}

export default DesktopMenu
