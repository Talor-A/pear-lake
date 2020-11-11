const Code = ({ children, ...props }) => (
  <pre {...props}>
    <code className="code-block">{children}</code>
  </pre>
)

export default Code
