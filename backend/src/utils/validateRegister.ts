import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput"

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@") || !options.email.includes(".")) {
    return [
      {
        field: "email",
        message: "Please enter valid Email Id",
      },
    ]
  }
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Username must be greater atleast 3 character",
      },
    ]
  }
  if (options.username.includes('@')) {
    return [
      {
        field: "username",
        message: "Username cannot contain @",
      },
    ]
  }
  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "password must be atleast 4 character",
      },
    ]
  }
  return null
}
