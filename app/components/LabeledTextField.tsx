import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/core"

export interface LabeledTextFieldProps extends InputProps {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: Omit<FormControlProps, "isRequired">
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <FormControl isInvalid={touched && normalizedError} isRequired={props.isRequired}>
        <FormLabel htmlFor={props.id}>{label}</FormLabel>
        <Input {...input} isDisabled={submitting} {...props} ref={ref} />
        <FormErrorMessage>{normalizedError}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default LabeledTextField
