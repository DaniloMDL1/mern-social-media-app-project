import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import Actions from "./Actions"
import { Link } from "react-router-dom"

const Post = () => {

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
            <Link to={`/post/asdasd`}>
                <Box borderRadius={"6px"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"} mt={3}>
                    <Image src="https://m.media-amazon.com/images/M/MV5BM2YwYTkwNjItNGQzNy00MWE1LWE1M2ItOTMzOGI1OWQyYjA0XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg"/>
                </Box>
            </Link>
            <Actions />
        </Box>
    )
}

export default Post