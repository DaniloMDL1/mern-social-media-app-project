import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Link, Text, useColorMode } from "@chakra-ui/react"
import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Box border={"1px solid"} borderColor={colorMode === "light" ? "gray.300" : "whiteAlpha.600"} rounded={"lg"} width={{ base: "280px", md: "320px"}} p={4}>
        <Text fontSize={"2xl"} textAlign={"center"} mb={4}>Sign Up</Text>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button mt={4} mb={2} size={"md"} w={"full"} colorScheme="blue">Sign Up</Button>
        <Link as={RouterLink} to={"/login"} fontSize={"sm"} color={"blue.400"}>Already have an account? Log In</Link>
      </Box>
    </Flex>
  )
}

export default SignUpPage