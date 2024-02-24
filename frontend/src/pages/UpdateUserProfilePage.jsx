import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Avatar, Center } from '@chakra-ui/react'
import { useRef } from 'react'

const UpdateUserProfilePage = () => {
  const picRef = useRef(null)

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={"gray.dark"}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Update Profile
        </Heading>
        <FormControl>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo" />
            </Center>
            <Center w="full">
              <Button w="full" onClick={() => picRef.current.click()}>Change Avatar</Button>
              <Input type="file" hidden ref={picRef}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="Full Name"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="Email Address"
            type="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Bio"
            type="text"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            colorScheme='blue'
            w="full">
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default UpdateUserProfilePage