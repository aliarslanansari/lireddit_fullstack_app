import { Box, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { withUrqlClient } from "next-urql"
import { useRouter } from "next/router"
import React from "react"
import InputField from "../components/InputField"
import Layout from "../components/Layout"
import { useCreatePostMutation } from "../generated/graphql"
import { createUrqlClient } from "../utils/createUrqlClient"
import useIsAuth from "../utils/useIsAuth"

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  useIsAuth()
  const router = useRouter()
  const [, createPost] = useCreatePostMutation()
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { error } = await createPost({ input: values })
          if (!error) {
            router.push("/")
          }
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
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost)
