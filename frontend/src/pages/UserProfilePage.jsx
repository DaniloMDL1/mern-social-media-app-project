import { useParams } from "react-router-dom"
import Post from "../components/Post"
import UserProfileHeader from "../components/UserProfileHeader"
import { useEffect, useState } from "react"
import useShowToast from "../hooks/useShowToast"
import { Flex, Spinner, Text } from "@chakra-ui/react"
import { useRecoilState } from "recoil"
import postsAtom from "../atoms/postsAtom"

const UserProfilePage = () => {
  const { username } = useParams()
  const [isUserProfileLoading, setIsUserProfileLoading] = useState(true)
  const [isUserPostsLoading, setIsUserPostsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)
  const showToast = useShowToast()
  const [posts, setPosts] = useRecoilState(postsAtom)

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json()

        if(data.error) {
          showToast("Error", data.error, "error")
          return
        }

        setUserProfile(data)
        
      } catch(error) {
        showToast("Error", error.message, "error")
      } finally {
        setIsUserProfileLoading(false)
      }
    }

    const getUserPosts = async () => {
      setPosts([])
      try {
        const res = await fetch(`/api/posts/user/${username}`)
        const data = await res.json()

        if(data.error) {
          showToast("Error", data.error, "error")
          return
        }

        setPosts(data)
        
      } catch(error) {
        showToast("Error", error.message, "error")
      } finally {
        setIsUserPostsLoading(false)
      }
    }

    getUserProfile()
    getUserPosts()
  }, [username, showToast])

  if(!userProfile && !isUserProfileLoading) {
    return (
      <Flex justifyContent={"center"}>
        <Text fontSize={"lg"}>User Not Found.</Text>
      </Flex>
    )
  }

  if(!userProfile && isUserProfileLoading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"lg"}/>
      </Flex>
    )
  }

  return (
    <>
      <UserProfileHeader userProfile={userProfile} setUserProfile={setUserProfile}/>
      {isUserPostsLoading && (
        <Flex justifyContent={"center"} mt={5}>
          <Spinner size={"lg"}/>
        </Flex>
      )}

      {!isUserPostsLoading && posts.length === 0 && (
        <Flex justifyContent={"center"} mt={5}>
          <Text>No posts for now.</Text>
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post}/>
      ))}
    </>
  )
}

export default UserProfilePage