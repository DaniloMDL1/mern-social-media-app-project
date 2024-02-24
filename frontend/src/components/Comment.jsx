import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

const Comment = () => {
  return (
    <Box>
        <Flex alignItems={"center"} gap={3}>
            <Avatar src="https://bit.ly/sage-adebayo" size={"sm"}/>
            <Flex>
                <Text fontSize={"sm"} fontWeight={"bold"}>yangyang12</Text>
            </Flex>
        </Flex>
        <Text mt={2}
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolores.
        </Text>
    </Box>
  )
}

export default Comment