import { Box, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React from "react"
import InputField from "../components/InputField"
import Wrapper from "../components/Wrapper"

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log({ values })
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="Title" placeholder="title" />
            <Box mt={4}>
              <InputField
                name="text"
                label="Text"
                placeholder="text..."
                textarea
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default CreatePost
