import React, { ReactNode } from "react"
import { Head } from "blitz"

import DesktopMenu from "app/components/DesktopMenu/DesktopMenu"
import styles from "./layout.module.css"
import { Row, Col } from "app/components/layout"

export type LayoutProps = {
  title?: string
  children: ReactNode
  sidemenu?: ReactNode
}

const Layout = ({ title, children, sidemenu }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "pear-lake"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className={styles["full-height"]}>
        <DesktopMenu>{sidemenu}</DesktopMenu>
        <div className={styles.scroll}>
          <main className={styles.main}>{children}</main>
        </div>
      </Row>
    </>
  )
}

export default Layout
