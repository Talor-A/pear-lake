import React from "react"
import styles from "./layout.module.css"
import makeclass from "utils/makeclass"

export const Row = ({
  children,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div {...props} className={makeclass(styles.row, props.className || "")}>
      {children}
    </div>
  )
}
export const Col = ({
  children,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div {...props} className={makeclass(styles.col, props.className || "")}>
      {children}
    </div>
  )
}
