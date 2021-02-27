import { Box, Heading, Link, Stack, Text, Flex } from "@chakra-ui/react"
import { withUrqlClient } from "next-urql"
import NextLink from "next/link"
import Layout from "../components/Layout"
import { usePostsQuery } from "../generated/graphql"
import { createUrqlClient } from "../utils/createUrqlClient"
const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: { limit: 10, cursor: "" },
  })
  return (
    <Layout>
      <Flex>
        <Heading>LiReddit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>
      {fetching && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
