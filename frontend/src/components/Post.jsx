import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import Actions from "./Actions"
import { Link } from "react-router-dom"

const Post = ({ post }) => {

    return (
        <Box p={4} mb={4}>
            <Flex justifyContent={"space-between"} alignItems={"center"} px={1}>
                <Link to={`/profile/asdasdad`}>
                    <Flex alignItems={"center"} gap={3}>
                        <Avatar src={post.postedBy?.profilePic} size={"md"}/>
                        <Text fontSize={"sm"}>{post.postedBy?.username}</Text>
                    </Flex>
                </Link>
                <Text fontSize={"sm"}>2 days ago</Text>
            </Flex>
            {post.postPic ? (
                <>
                    <Box py={2} px={1}>
                        {post.desc}
                    </Box>
                    <Link to={`/post/${post._id}`}>
                        <Box borderRadius={"6px"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"} mt={3}>
                            <Image src={post.postPic}/>
                        </Box>
                    </Link>
                </>
            ) : (
                <Link to={`/post/${post._id}`}>
                    <Box py={2} px={1}>
                            {post.desc}
                    </Box>
                </Link>
            )}
            
            <Actions />
        </Box>
    )
}

export default Post