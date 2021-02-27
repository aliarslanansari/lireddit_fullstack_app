import { Box, Heading, Link, Stack, Text, Flex, Button } from "@chakra-ui/react"
import { withUrqlClient } from "next-urql"
import NextLink from "next/link"
import Layout from "../components/Layout"
import { usePostsQuery } from "../generated/graphql"
import { createUrqlClient } from "../utils/createUrqlClient"
const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: { limit: 10, cursor: "" },
  })
  if (!fetching && !data) {
    return <div>post fetch query failed</div>
  }
  return (
    <Layout>
      <Flex>
        <Heading>LiReddit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      <Flex>
        <Button mx="auto" isLoading={fetching} my={4}>
          Load More
        </Button>
      </Flex>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
