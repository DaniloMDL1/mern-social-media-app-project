import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react"
import Actions from "../components/Actions"
import { Link } from "react-router-dom"
import Comment from "../components/Comment"

const PostPage = () => {
  return (
    <Box p={4} mb={4}>
      <Flex justifyContent={"space-between"} alignItems={"center"} px={1}>
          <Link to={`/profile/asdasdad`}>
              <Flex alignItems={"center"} gap={3}>
                  <Avatar src={"https://bit.ly/sage-adebayo"} size={"md"}/>
                  <Text fontSize={"sm"}>yangyang12</Text>
              </Flex>
          </Link>
          <Text fontSize={"sm"}>2 days ago</Text>
      </Flex>
      <Box borderRadius={"6px"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"} mt={3}>
          <Image src="https://m.media-amazon.com/images/M/MV5BM2YwYTkwNjItNGQzNy00MWE1LWE1M2ItOTMzOGI1OWQyYjA0XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg"/>
      </Box>
      <Actions />
      <Divider my={4}/>
      <Flex justifyContent={"space-between"}>
        <Flex align={"center"} gap={2}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, comment and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4}/>
      <Comment />
    </Box>
  )
}

export default PostPage