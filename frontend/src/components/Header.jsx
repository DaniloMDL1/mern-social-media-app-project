import { Box, Button, Flex, Link, Text, useColorMode, useDisclosure } from "@chakra-ui/react"
import SearchUsersInput from "./SearchUsersInput"
import { CiLogout } from "react-icons/ci"
import { FaUser } from "react-icons/fa"
import { FaSun, FaMoon } from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom"
import { AddIcon } from "@chakra-ui/icons";
import CreatePostModal from "./CreatePostModal";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
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
                <Link as={RouterLink} to={`/profile/asdasd`}>
                    <Box p={2.5} _hover={{ bg: colorMode === "light" ? "gray.200" : "whiteAlpha.200" }} cursor={"pointer"} borderRadius={"full"}>
                        <FaUser size={20}/>
                    </Box>
                </Link>
                <Button size={"md"}>
                    <CiLogout size={20}/>
                </Button>
                <Button bg={"none"} onClick={toggleColorMode}>
                    {colorMode === "light" ? (<FaMoon size={20}/>) : (<FaSun size={20}/>)}
                </Button>
            </Box>
        </Flex>
    )
}

export default Header