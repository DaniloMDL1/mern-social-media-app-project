import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import useShowToast from "../hooks/useShowToast"
import commentsAtom from "../atoms/commentsAtom"

const CreateCommentModal = ({ isOpen, onClose, post }) => {
  const [comment, setComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const user = useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [comments, setComments] = useRecoilState(commentsAtom)

  const handleCreateComment = async () => {
    if(!user) {
      showToast("Error", "You must be logged in to create a comment", "error")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch(`/api/comments/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, postedBy: user._id, postId: post._id})
      })
      const data = await res.json()

      if(data.error) {
        showToast("Error", data.error, "error")
        return
      }

      setComments([ data, ...comments ])
      showToast("Success", "You successfully created comment.", "success")
      onClose()
      setComment("")
      
    } catch(error) {
      showToast("Error", error.message, "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.dark"}>
          <ModalHeader>Create Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
              type="text" 
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleCreateComment} isLoading={isLoading} colorScheme='blue' mr={3}>
              Comment
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default CreateCommentModal