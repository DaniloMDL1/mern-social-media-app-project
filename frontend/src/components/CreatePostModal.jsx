import { Box, Button, CloseButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useColorMode } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../hooks/usePreviewImg";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";

const CreatePostModal = ({ isOpen, onClose }) => {
    const picRef = useRef(null)
    const [desc, setDesc] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { imgUrl, handleImgChange, setImgUrl } = usePreviewImg()
    const user = useRecoilValue(userAtom)
    const { colorMode, toggleColorMode } = useColorMode()
    const showToast = useShowToast()
    const [posts, setPosts] = useRecoilState(postsAtom)

    const handleCreatePost = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postedBy: user._id, desc, postPic: imgUrl})
            })
            const data = await res.json()

            if(data.error) {
                showToast("Error", data.error, "error")
                return
            }

            console.log(data)
            showToast("Success", "Post is created successfully.", "success")
            setPosts([data, ...posts])
            onClose()
            setDesc("")
            setImgUrl(null)
            
        } catch(error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={colorMode === "light" ? "white" : "gray.dark"}>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} resize={"none"} placeholder="Description"/>
                <Input type="file" hidden ref={picRef} onChange={handleImgChange}/>
                <BsFillImageFill onClick={() => picRef.current.click()} cursor={"pointer"} size={25} style={{ marginTop: "20px" }}/>

                {imgUrl && (
                    <Box mt={4} position={"relative"}>
                        <Image src={imgUrl}/>
                        <CloseButton onClick={() => setImgUrl(null)} position={"absolute"} right={5} top={5} color={"white"}/>
                    </Box>
                )}
            </ModalBody>

            <ModalFooter>
                <Button onClick={handleCreatePost} isLoading={isLoading} colorScheme='blue' mr={3}>
                    Post
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreatePostModal