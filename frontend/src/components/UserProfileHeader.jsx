import { Avatar, Box, Button, Flex, Text, VStack, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const UserProfileHeader = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <VStack gap={4} alignItems={"flex-start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>Yang Yang</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>yangyang12</Text>
                        <Text fontWeight={"xs"} bg={colorMode === "light" ? "gray.200" : "gray.dark"} p={1} borderRadius={"full"}>socialmedia</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar src={"https://bit.ly/sage-adebayo"} size={{ base: "lg", sm: "xl" }}/>
                </Box>
            </Flex>
            <Text>this is bio</Text>
            <Link to={"/update/profile"}>
                <Button size={"md"}>Update Profile</Button>
            </Link>
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>220 followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Text color={"gray.light"}>socialmedia.com</Text>
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