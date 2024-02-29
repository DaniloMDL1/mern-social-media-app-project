import { Box, Button, Container, Flex, Link, Text, useColorMode, useDisclosure } from "@chakra-ui/react"
import SearchUsersInput from "./SearchUsersInput"
import { CiLogout } from "react-icons/ci"
import { FaUser } from "react-icons/fa"
import { FaSun, FaMoon } from "react-icons/fa6";
import { Link as RouterLink, useLocation } from "react-router-dom"
import { AddIcon } from "@chakra-ui/icons";
import CreatePostModal from "./CreatePostModal";
import useLogout from "../hooks/useLogout";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { CiMenuBurger } from "react-icons/ci";
import MobileDrawer from "./MobileDrawer";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoading, handleLogout } = useLogout()
    const user = useRecoilValue(userAtom)
    const { pathname } = useLocation()
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()

    return (
        <>
            {user && (
                <>
                    <Flex display={{ base: "none", md: "flex" }} p={4} alignItems={"center"} borderBottom={"1px solid"} borderColor={colorMode === "light" ? "gray.200" : "gray.dark"}>
                        <Box flex={0.3}>
                            <Flex alignItems={"center"} gap={4}>
                                <Link as={RouterLink} to={"/"} _hover={{ color: "blue.500"}}>
                                    <Text fontSize={"2xl"} fontWeight={"semibold"}>SocialMediaApp</Text>
                                </Link>
                                {pathname === `/profile/${user.username}` && (
                                    <Button onClick={onOpen} size={"md"}>
                                        <AddIcon />
                                        <CreatePostModal isOpen={isOpen} onClose={onClose}/>
                                    </Button>
                                )}
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
                            <Button onClick={handleLogout} isLoading={isLoading} size={"sm"}>
                                <CiLogout size={20}/>
                            </Button>
                            <Button bg={"none"} onClick={toggleColorMode} size={"sm"}>
                                {colorMode === "light" ? (<FaMoon size={20}/>) : (<FaSun size={20}/>)}
                            </Button>
                        </Box>
                    </Flex>

                    <Flex display={{ base: "flex", md: "none"}} p={4} alignItems={"center"} borderBottom={"1px solid"} borderColor={colorMode === "light" ? "gray.200" : "gray.dark"} justifyContent={"space-between"}>
                        <Flex alignItems={"center"} gap={4}>
                            <CiMenuBurger size={20} onClick={onDrawerOpen}/>
                            <MobileDrawer isOpen={isDrawerOpen} onClose={onDrawerClose}/>
                            <Link as={RouterLink} to={"/"} _hover={{ color: "blue.500"}}>
                                <Text fontSize={"lg"} fontWeight={"semibold"}>SocialMediaApp</Text>
                            </Link>
                            {pathname === `/profile/${user.username}` && (
                                <Button onClick={onOpen} size={"sm"}>
                                    <AddIcon />
                                    <CreatePostModal isOpen={isOpen} onClose={onClose}/>
                                </Button>
                            )}
                        </Flex>
                        <Flex alignItems={"center"}>
                            <Link as={RouterLink} to={`/profile/${user.username}`}>
                                <Box p={2.5} _hover={{ bg: colorMode === "light" ? "gray.200" : "whiteAlpha.200" }} cursor={"pointer"} borderRadius={"full"}>
                                    <FaUser size={20}/>
                                </Box>
                            </Link>
                            <Button bg={"none"} onClick={toggleColorMode}>
                                {colorMode === "light" ? (<FaMoon size={20}/>) : (<FaSun size={20}/>)}
                            </Button>
                        </Flex>
                    </Flex>
                </>

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