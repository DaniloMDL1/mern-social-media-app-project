import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Link, Text, useColorMode } from "@chakra-ui/react"
import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import useShowToast from "../hooks/useShowToast"
import { useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLoading, setIsLoading] = useState(false)
  const showToast = useShowToast()
  const setUser = useSetRecoilState(userAtom)
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: ""
  })

  const handleSignUp = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      })
      const data = await res.json()

      if(data.error) {
        showToast("Error", data.error, "error")
        return
      }

      setUser(data)
      localStorage.setItem("socialmedia-user", JSON.stringify(data))
      showToast("Success", "You are successfully signed up.", "success")
      
    } catch (error) {
      showToast("Error", error.message, "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Box border={"1px solid"} borderColor={colorMode === "light" ? "gray.300" : "whiteAlpha.600"} rounded={"lg"} width={{ base: "280px", md: "320px"}} p={4}>
        <Text fontSize={"2xl"} textAlign={"center"} mb={4}>Sign Up</Text>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input 
            type="text" 
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input 
            type="text" 
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input 
            type="text" 
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input 
              type={showPassword ? 'text' : 'password'} 
              value={inputs.password}
             onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button onClick={handleSignUp} isLoading={isLoading} mt={4} mb={2} size={"md"} w={"full"} colorScheme="blue">
          Sign Up
        </Button>
        <Link as={RouterLink} to={"/login"} fontSize={"sm"} color={"blue.400"}>Already have an account? Log In</Link>
      </Box>
    </Flex>
  )
}

export default SignUpPage