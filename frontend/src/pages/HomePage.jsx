import { useEffect, useState } from "react"
import Post from "../components/Post"
import useShowToast from "../hooks/useShowToast"
import { useRecoilState } from "recoil"
import postsAtom from "../atoms/postsAtom"
import { Flex, Spinner, Text } from "@chakra-ui/react"

const HomePage = () => {
  const [isFeedPostsLoading, setIsFeedPostsLoading] = useState(true)
  const showToast = useShowToast()
  const [posts, setPosts] = useRecoilState(postsAtom)

  useEffect(() => {
    const getFeedPosts = async () => {
      setPosts([])
      try {
        const res = await fetch("/api/posts/feed")
        const data = await res.json()

        if(data.error) {
          showToast("Error", data.error, "error")
          return
        }

        console.log(data)
        setPosts(data)
        
      } catch(error) {
        showToast("Error", error.message, "error")
      } finally {
        setIsFeedPostsLoading(false)
      }
    }

    getFeedPosts()
  }, [])

  return (
    <>
      {isFeedPostsLoading && (
        <Flex justifyContent={"center"} mt={5}>
          <Spinner size={"lg"}/>
        </Flex>
      )}

      {!isFeedPostsLoading && posts.length === 0 && (
        <Flex justifyContent={"center"} mt={5}>
          <Text>Follow someone to see their posts.</Text>
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post}/>
      ))}
    </>
  )
}

export default HomePage