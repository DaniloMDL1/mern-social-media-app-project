import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Avatar, Center } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'

const UpdateUserProfilePage = () => {
  const [user, setUser] = useRecoilState(userAtom)
  const [isLoading, setIsLoading] = useState(false)
  const showToast = useShowToast()
  const picRef = useRef(null)
  const [inputs, setInputs] = useState({
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    password: "",
    bio: user.bio
  })
  const { imgUrl, handleImgChange } = usePreviewImg()

  const handleUpdateProfile = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl })
      })
      const data = await res.json()

      if(data.error) {
        showToast("Error", data.error, "error")
        return
      }

      setUser(data)
      localStorage.setItem("socialmedia-user", JSON.stringify(data))
      showToast("Success", "You updated your profile successfully.", "success")
      
    } catch(error) {
      showToast("Error", error.message, "error")
    } finally {
      setIsLoading(false)
    }
  }

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
              <Avatar size="xl" src={imgUrl || user.profilePic} />
            </Center>
            <Center w="full">
              <Button w="full" onClick={() => picRef.current.click()}>Change Avatar</Button>
              <Input type="file" hidden ref={picRef} onChange={handleImgChange}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="Full Name"
            type="text"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            type="text"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input
            placeholder="Email Address"
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Bio"
            type="text"
            value={inputs.bio}
            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            colorScheme='blue'
            w="full"
            onClick={handleUpdateProfile}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default UpdateUserProfilePage