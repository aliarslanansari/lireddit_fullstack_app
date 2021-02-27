import { Box, Heading, Link, Stack, Text, Flex, Button } from "@chakra-ui/react"
import { withUrqlClient } from "next-urql"
import NextLink from "next/link"
import { useState } from "react"
import Layout from "../components/Layout"
import { usePostsQuery } from "../generated/graphql"
import { createUrqlClient } from "../utils/createUrqlClient"
const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: "",
  })

  const [{ data, fetching }] = usePostsQuery({
    variables,
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
          {data!.posts.post.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data &&
        data.posts.hasMore &&(
          <Flex>
            <Button
              mx="auto"
              isLoading={fetching}
              my={8}
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data?.posts.post[data.posts.post.length - 1]?.createdAt ||
                    "",
                })
              }}
            >
              Load More
            </Button>
          </Flex>
        )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
