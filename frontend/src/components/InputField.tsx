import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react"
import { useField } from "formik"
import React, { InputHTMLAttributes } from "react"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  placeholder: string
  textarea?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextArea: any = Input
  if (textarea) {
    InputOrTextArea = Textarea
  }
  const [field, { error }] = useField(props)
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}

export default InputField
