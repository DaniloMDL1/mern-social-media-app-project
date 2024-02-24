import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react"
import { useRef } from "react"
import { BsFillImageFill } from "react-icons/bs";

const CreatePostModal = ({ isOpen, onClose }) => {
    const picRef = useRef(null)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"gray.dark"}>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Textarea resize={"none"} placeholder="Description"/>
                <Input type="file" hidden ref={picRef}/>
                <BsFillImageFill onClick={() => picRef.current.click()} cursor={"pointer"} size={25} style={{ marginTop: "20px" }}/>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3}>
                Post
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreatePostModal