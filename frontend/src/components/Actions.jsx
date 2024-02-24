import { Box, Flex, Text, useColorMode, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa6";
import CreateCommentModal from "./CreateCommentModal";

const Actions = () => {
    const [isLiked, setIsLiked] = useState(false)
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex alignItems={"center"} gap={4} mt={2}>
                {isLiked ? (<FaHeart color="red" cursor={"pointer"} size={22} onClick={() => setIsLiked(!isLiked)}/>) : (<FaRegHeart cursor={"pointer"} color={`${colorMode === "light" ? "black" : "white"}`} size={22} onClick={() => setIsLiked(!isLiked)}/>)}
                <FaRegComment onClick={onOpen} cursor={"pointer"} size={22}/>
                <CreateCommentModal isOpen={isOpen} onClose={onClose}/>
            </Flex>
            <Flex alignItems={"center"} gap={2} mt={2}>
                <Text color={"gray.light"} fontSize={"sm"}>123 replies</Text>
                <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}></Box>
                <Text color={"gray.light"} fontSize={"sm"}>456 likes</Text>
            </Flex>
        </>
    )
}

export default Actions