import { Avatar, Box, Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorMode, useDisclosure } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useState } from "react"
import useShowToast from "../hooks/useShowToast"
import { Link } from "react-router-dom"

const SearchUsersInput = () => {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const showToast = useShowToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const handleSearchForUsers = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/users/search?username=${search}`)
      const data = await res.json()

      if(data.error) {
        showToast("Error", data.error, "error")
        return
      }

      setUsers(data)
      onOpen()
      setSearch("")
      
    } catch(error) {
      showToast("Error", error.message, "error")
    }
  }

  return (
    <>
      <form onSubmit={handleSearchForUsers}>
        <InputGroup width={{ base: "200px", md: "260px"}}>
            <Input 
              type="text" 
              placeholder="Search for users"
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
                <SearchIcon color={"gray"}/>
            </InputRightElement>
        </InputGroup>
      </form>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={colorMode === "light" ? "white" : "gray.dark"} width={{ base: "340px", md: "380px" }} h={"340px"} overflow={"auto"}>
          <ModalHeader>Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {users.length === 0 && (
              <Flex justifyContent={"center"}>
                <Text fontSize={"lg"}>Users not found.</Text>
              </Flex>
            )}
            {users.map((user) => (
              <Link key={user._id} to={`/profile/${user.username}`} onClick={onClose}>
                <Flex _hover={{ bg: colorMode === "light" ? "gray.100" : "whiteAlpha.200"}} rounded={"lg"} p={4} alignItems={"center"} gap={4}>
                  <Avatar src={user.profilePic} size={"md"}/>
                  <Text fontSize={"md"}>{user.username}</Text>
                </Flex>
              </Link>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SearchUsersInput