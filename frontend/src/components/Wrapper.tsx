import { Box } from "@chakra-ui/react"
import React from "react"

interface WrapperProps {
  variant?: "small" | "regular"
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box maxWidth={variant === "regular" ? "900px" : "500px"} mt={8} mx="auto">
      {children}
    </Box>
  )
}

export default Wrapper
