import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react"
import Actions from "../components/Actions"
import { Link, useParams } from "react-router-dom"
import Comment from "../components/Comment"
import { useEffect, useState } from "react"
import useShowToast from "../hooks/useShowToast"
import { useRecoilState } from "recoil"
import postsAtom from "../atoms/postsAtom"
import { formatDistanceToNow } from "date-fns"
import commentsAtom from "../atoms/commentsAtom"

const PostPage = () => {
  const { id } = useParams()
  const showToast = useShowToast()
  const [isPostLoading, setIsPostLoading] = useState(true)
  const [isCommentsLoading, setIsCommentsLoading] = useState(true)
  const [postUser, setPostUser] = useState(null)
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [comments, setComments] = useRecoilState(commentsAtom)
  const currentPost = posts[0]

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()

        if(data.error) {
          showToast("Error", data.error, "error")
          return
        }

        setPosts([data])
        
      } catch(error) {
        showToast("Error", error.message, "error")
      } finally {
        setIsPostLoading(false)
      }
    }

    getPost()
  }, [id])

  useEffect(() => {
    const getPostComments = async () => {
      try {
        const res = await fetch(`/api/comments/post/${id}`)
        const data = await res.json()

        if(data.error) {
          showToast("Error", data.error, "error")
          return
        }

        setComments(data)
        
      } catch(error) {
        showToast("Error", error.message, "error")
      } finally {
        setIsCommentsLoading(false)
      }
    }

    const getUserProfile = async () => {
      try {
        if(!currentPost) {
          return
        }
        const res = await fetch(`/api/users/profile/${currentPost.postedBy}`)
        const data = await res.json()

        if(data.error) {
            showToast("Error", data.error, "error")
            return
        }

        setPostUser(data)
          
      } catch(error) {
          showToast("Error", error.message, "error")
          setPostUser(null)
      } 
    }

    if(currentPost) {
      getUserProfile()
      getPostComments()
    }
  }, [id, currentPost])

  if(!isPostLoading && !currentPost) {
    return (
      <Flex justifyContent={"center"}>
        <Text fontSize={"lg"}>Post Not Found.</Text>
      </Flex>
    )
  }

  if(isPostLoading) {
    return (
      <Flex justifyContent={"center"} mt={5}>
        <Spinner size={"lg"}/>
      </Flex>
    )
  }

  if(!postUser) return null

  return (
    <Box p={4} mb={4}>
      <Flex justifyContent={"space-between"} alignItems={"center"} px={1}>
          <Link to={`/profile/${postUser.username}`}>
              <Flex alignItems={"center"} gap={3}>
                  <Avatar src={postUser.profilePic} size={"md"}/>
                  <Text fontSize={"sm"}>{postUser.username}</Text>
              </Flex>
          </Link>
          <Text fontSize={"sm"}>{formatDistanceToNow(new Date(currentPost.createdAt))} ago</Text>
      </Flex>
      <Box py={2} px={1}>
        {currentPost.desc}
      </Box>
      {currentPost.postPic && (
        <Box borderRadius={"6px"} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"} mt={3}>
            <Image src={currentPost.postPic}/>
        </Box>
      )}
      <Actions post={currentPost}/>
      <Divider my={4}/>
      <Flex justifyContent={"space-between"}>
        <Flex align={"center"} gap={2}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, comment and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4}/>
      {isCommentsLoading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"lg"}/>
        </Flex>
      )}

      {!isCommentsLoading && comments.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text fontSize={"lg"}>No one commented on this post yet.</Text>
        </Flex>
      )}

      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment}/>
      ))}
    </Box>
  )
}

export default PostPage