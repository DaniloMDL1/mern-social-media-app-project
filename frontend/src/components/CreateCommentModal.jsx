import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

const CreateCommentModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.dark"}>
          <ModalHeader>Create Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="text" placeholder="Comment"/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Comment
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default CreateCommentModal