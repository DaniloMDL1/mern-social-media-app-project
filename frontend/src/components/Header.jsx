import { Box, Button, Container, Flex, Link, Text, useColorMode, useDisclosure } from "@chakra-ui/react"
import SearchUsersInput from "./SearchUsersInput"
import { CiLogout } from "react-icons/ci"
import { FaUser } from "react-icons/fa"
import { FaSun, FaMoon } from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom"
import { AddIcon } from "@chakra-ui/icons";
import CreatePostModal from "./CreatePostModal";
import useLogout from "../hooks/useLogout";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoading, handleLogout } = useLogout()
    const user = useRecoilValue(userAtom)

    return (
        <>
            {user && (
                <Flex p={4} alignItems={"center"} borderBottom={"1px solid"} borderColor={colorMode === "light" ? "gray.200" : "gray.dark"}>
                    <Box flex={0.3}>
                        <Flex alignItems={"center"} gap={4}>
                            <Link as={RouterLink} to={"/"} _hover={{ color: "blue.500"}}>
                                <Text fontSize={"2xl"} fontWeight={"semibold"}>SocialMediaApp</Text>
                            </Link>
                            <Button onClick={onOpen} size={"md"}>
                                <AddIcon />
                                <CreatePostModal isOpen={isOpen} onClose={onClose}/>
                            </Button>
                        </Flex>
                    </Box>
                    <Box flex={0.4} display={"flex"} justifyContent={"center"}>
                        <SearchUsersInput />
                    </Box>
                    <Box flex={0.3} display={"flex"} alignItems={"center"} gap={4} justifyContent={"flex-end"}>
                        <Link as={RouterLink} to={`/profile/${user.username}`}>
                            <Box p={2.5} _hover={{ bg: colorMode === "light" ? "gray.200" : "whiteAlpha.200" }} cursor={"pointer"} borderRadius={"full"}>
                                <FaUser size={20}/>
                            </Box>
                        </Link>
                        <Button onClick={handleLogout} isLoading={isLoading} size={"md"}>
                            <CiLogout size={20}/>
                        </Button>
                        <Button bg={"none"} onClick={toggleColorMode}>
                            {colorMode === "light" ? (<FaMoon size={20}/>) : (<FaSun size={20}/>)}
                        </Button>
                    </Box>
                </Flex>
            )}
            {!user && (
                <Container maxW={"800px"} py={3}>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize={"2xl"} fontWeight={"semibold"}>SocialMediaApp</Text>
                        <Flex alignItems={"center"} gap={4}>
                            <Link as={RouterLink} to={"/login"} _hover={{ color: "blue.400" }}>
                                <Text fontSize={"md"}>Log In</Text>
                            </Link>
                            <Link as={RouterLink} to={"/signup"} _hover={{ color: "blue.400" }}>
                                <Text fontSize={"md"}>Sign Up</Text>
                            </Link>
                        </Flex>
                    </Flex>
                </Container>
            )}
        </>
    )
}

export default Header