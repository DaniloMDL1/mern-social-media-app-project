import { Avatar, Box, Button, Flex, Text, VStack, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import useShowToast from "../hooks/useShowToast"
import { useState } from "react"

const UserProfileHeader = ({ userProfile, setUserProfile }) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const user = useRecoilValue(userAtom)
    const showToast = useShowToast()
    const [isLoading, setIsLoading] = useState(false)
    const [isFollowing, setIsFollowing] = useState(userProfile.followers.includes(user?._id))

    const handleFollowUnfollow = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`/api/users/follow/${userProfile._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()

            if(data.error) {
                showToast("Error", data.error, "error")
                return
            }

            if(isFollowing) {
                showToast("Success", `${userProfile.username} is unfollowed.`, "success")
                setUserProfile((prevProfile) => (
                    {
                        ...prevProfile,
                        followers: prevProfile.followers.filter((id) => id !== user._id )
                    }
                ))
            } else {
                showToast("Success", `${userProfile.username} is followed.`, "success")
                setUserProfile((prevProfile) => (
                    {
                        ...prevProfile,
                        followers: [...prevProfile.followers, user._id]
                    }
                ))
            }

            setIsFollowing(!isFollowing)
            
        } catch(error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <VStack gap={4} alignItems={"flex-start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>{userProfile.fullName}</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{userProfile.username}</Text>
                        <Text fontWeight={"xs"} bg={colorMode === "light" ? "gray.200" : "gray.dark"} p={1} borderRadius={"full"}>socialmedia</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar src={userProfile.profilePic} size={{ base: "lg", sm: "xl" }}/>
                </Box>
            </Flex>
            <Text>{userProfile.bio}</Text>
            {user?._id === userProfile._id ? (
                <Link to={"/update/profile"}>
                    <Button size={"md"}>Update Profile</Button>
                </Link>
            ) : (
                <Button width={"100px"} onClick={handleFollowUnfollow} isLoading={isLoading}>
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{userProfile.followers.length} followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Text color={"gray.light"}>{userProfile.following.length} following</Text>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Posts</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Reels</Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserProfileHeader