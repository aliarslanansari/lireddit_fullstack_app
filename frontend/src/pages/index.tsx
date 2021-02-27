import { createUrqlClient } from "../utils/createUrqlClient"
import { withUrqlClient } from "next-urql"
import { usePostsQuery } from "../generated/graphql"
import Layout from "../components/Layout"
import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"
const Index = () => {
  const [{ data }] = usePostsQuery({ variables: { limit: 10, cursor: "" } })
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>Create Post</Link>
      </NextLink>
      {!data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.map((p) => (
            <Box key={p.id}>
              <Heading>{p.title}</Heading>
              <Text mt={4}>{p.text}</Text>
            </Box>
          ))}
        </Stack>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
