import { Box, Flex, Text, useColorMode, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa6";
import CreateCommentModal from "./CreateCommentModal";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import commentsAtom from "../atoms/commentsAtom";

const Actions = ({ post }) => {
    const user = useRecoilValue(userAtom)
    const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id))
    const [isLikeLoading, setIsLikeLoading] = useState(false)
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const showToast = useShowToast()
    const [posts, setPosts] = useRecoilState(postsAtom)

    const handleLikeUnlikePost = async () => {
        if(!user) {
            showToast("Error", "You must be logged in to like a post.", "error")
            return
        }
        if(isLikeLoading) return
        setIsLikeLoading(true)
        try {
            const res = await fetch(`/api/posts/like/${post._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()

            if(data.error) {
                showToast("Error", data.error, "error")
                return
            }

            if(!isLiked) {
                const updatedPost = posts.map((p) => {
                    if(p._id === post._id) {
                        return {
                            ...p,
                            likes: [ ...p.likes, user._id ]
                        }
                    }
                    return p
                })
                setPosts(updatedPost)

            } else {
                const updatedPost = posts.map((p) => {
                    if(p._id === post._id) {
                        return {
                            ...p,
                            likes: p.likes.filter((id) => id !== user._id)
                        }
                    }
                    return p
                })
                setPosts(updatedPost)
            }

            setIsLiked(!isLiked)
            
        } catch(error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLikeLoading(false)
        }
    }

    return (
        <>
            <Flex alignItems={"center"} gap={4} mt={2}>
                {isLiked ? (<FaHeart color="red" cursor={"pointer"} size={22} onClick={handleLikeUnlikePost}/>) : (<FaRegHeart cursor={"pointer"} color={`${colorMode === "light" ? "black" : "white"}`} size={22} onClick={handleLikeUnlikePost}/>)}
                <FaRegComment onClick={onOpen} cursor={"pointer"} size={22}/>
                <CreateCommentModal isOpen={isOpen} onClose={onClose} post={post}/>
            </Flex>
            <Flex alignItems={"center"} gap={2} mt={2}>
                <Text color={"gray.light"} fontSize={"sm"}>{post.likes.length} likes</Text>
            </Flex>
        </>
    )
}

export default Actions