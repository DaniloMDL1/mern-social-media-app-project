import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import Actions from "./Actions"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import { DeleteIcon } from "@chakra-ui/icons"
import { useState } from "react"
import useShowToast from "../hooks/useShowToast"
import postsAtom from "../atoms/postsAtom"

const Post = ({ post }) => {
    const user = useRecoilValue(userAtom)
    const [isLoading, setIsLoading] = useState(false)
    const showToast = useShowToast()
    const [posts, setPosts] = useRecoilState(postsAtom)

    const handleDeletePost = async () => {
        if(isLoading) return
        setIsLoading(true)
        try {
            const res = await fetch(`/api/posts/delete/${post._id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()

            if(data.error) {
                showToast("Error", data.error, "error")
                return
            }

            const deletePost = posts.filter((p) => p._id !== post._id)
            setPosts(deletePost)
            showToast("Success", "Post is successfully deleted.", "success")
            
        } catch(error) {
            showToast("Error", data.error, "error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box p={4} mb={4}>
            <Flex justifyContent={"space-between"} alignItems={"center"} px={1}>
                <Link to={`/profile/${post.postedBy?.username}`}>
                    <Flex alignItems={"center"} gap={3}>
                        <Avatar src={post.postedBy?.profilePic} size={"md"}/>
                        <Text fontSize={"sm"}>{post.postedBy?.username}</Text>
                    </Flex>
                </Link>
                <Flex alignItems={"center"} gap={4}>
                    <Text fontSize={{ base: "xs", md: "sm" }}>{formatDistanceToNow(new Date(post.createdAt))} ago</Text>
                    {user?._id === post.postedBy?._id && (
                        <DeleteIcon onClick={handleDeletePost} cursor={"pointer"} _hover={{ color: "red.500" }}/>
                    )}
                </Flex>
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
            
            <Actions post={post}/>
        </Box>
    )
}

export default Post