import { useParams } from "react-router-dom"
import Post from "../components/Post"
import UserProfileHeader from "../components/UserProfileHeader"
import { useEffect, useState } from "react"
import useShowToast from "../hooks/useShowToast"
import { Flex, Spinner } from "@chakra-ui/react"

const UserProfilePage = () => {
  const { username } = useParams()
  const [isUserProfileLoading, setIsUserProfileLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)
  const showToast = useShowToast()

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

    getUserProfile()
  }, [username, showToast])

  if(!userProfile && !isUserProfileLoading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"lg"}/>
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
      <Post />
      <Post />
      <Post />
    </>
  )
}

export default UserProfilePage