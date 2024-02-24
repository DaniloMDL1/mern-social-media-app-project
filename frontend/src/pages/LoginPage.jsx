import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Link, Text, useColorMode } from "@chakra-ui/react"
import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import useShowToast from "../hooks/useShowToast"
import { useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLoading, setIsLoading] = useState(false)
  const showToast = useShowToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const setUser = useSetRecoilState(userAtom)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if(data.error) {
        showToast("Error", data.error, "error")
        return
      }

      setUser(data)
      localStorage.setItem("socialmedia-user", JSON.stringify(data))
      
    } catch(error) {
      showToast("Error", error.message, "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Box border={"1px solid"} borderColor={colorMode === "light" ? "gray.300" : "whiteAlpha.600"} rounded={"lg"} width={{ base: "280px", md: "320px"}} p={4}>
        <Text fontSize={"2xl"} textAlign={"center"} mb={4}>Log In</Text>
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input 
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
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
        <Button onClick={handleLogin} isLoading={isLoading} mt={4} mb={2} size={"md"} w={"full"} colorScheme="blue">
          Log In
        </Button>
        <Link as={RouterLink} to={"/signup"} fontSize={"sm"} color={"blue.400"}>Don't have an account? Sign Up</Link>
      </Box>
    </Flex>
  )
}

export default LoginPage