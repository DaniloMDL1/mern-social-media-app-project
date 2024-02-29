import { DeleteIcon } from "@chakra-ui/icons"
import { Avatar, Box, Flex, Text } from "@chakra-ui/react"
import { formatDistanceToNow } from "date-fns"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import { useState } from "react"
import commentsAtom from "../atoms/commentsAtom"
import useShowToast from "../hooks/useShowToast"

const Comment = ({ comment }) => {
  const user = useRecoilValue(userAtom)
  const [comments, setComments] = useRecoilState(commentsAtom)
  const [isLoading, setIsLoading] = useState(false)
  const showToast = useShowToast()

  const handleDeleteComment = async () => {
    if(isLoading) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/comments/delete/${comment._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()

      if(data.error) {
        showToast("Error", data.error, "error")
        return
      }

      const deleteComment = comments.filter((c) => c._id !== comment._id)
      setComments(deleteComment)
      showToast("Success", "Comment is successfully deleted.", "success")
      
    } catch(error) {
      showToast("Error", data.error, "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box mb={6}>
        <Flex alignItems={"center"} gap={3}>
            <Avatar src={comment.postedBy?.profilePic} size={"sm"}/>
            <Flex alignItems={"center"} gap={3}>
                <Text fontSize={"sm"} fontWeight={"bold"}>{comment.postedBy?.username}</Text>
                <Text fontSize={{ base: "xs", md: "sm" }}>{formatDistanceToNow(new Date(comment.createdAt))} ago</Text>
                {user?._id === comment.postedBy?._id && (
                  <DeleteIcon onClick={handleDeleteComment} cursor={"pointer"} _hover={{ color: "red.500" }}/>
                )}
            </Flex>
        </Flex>
        <Text mt={2}>
          {comment.comment}
        </Text>
    </Box>
  )
}

export default Comment