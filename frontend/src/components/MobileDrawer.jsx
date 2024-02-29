import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, useColorMode } from "@chakra-ui/react"
import SearchUsersInput from "./SearchUsersInput"
import { CiLogout } from "react-icons/ci"
import useLogout from "../hooks/useLogout"

const MobileDrawer = ({ isOpen, onClose }) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isLoading, handleLogout } = useLogout()

    return (
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            size={"xs"}
        >
            <DrawerOverlay />
            <DrawerContent bg={colorMode === "light" ? "white" : "gray.dark"}>
            <DrawerCloseButton />
            <DrawerHeader>SocialMediaApp</DrawerHeader>

            <DrawerBody mt={3}>
                <Flex justifyContent={"center"}>
                    <SearchUsersInput />
                </Flex>
            </DrawerBody>

            <DrawerFooter justifyContent={"flex-start"}>
                <Button onClick={handleLogout} isLoading={isLoading} size={"lg"}>
                    <CiLogout size={20}/>
                </Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileDrawer