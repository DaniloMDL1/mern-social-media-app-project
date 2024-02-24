import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

const SearchUsersInput = () => {
  return (
    <InputGroup width={{ base: "200px", md: "260px"}}>
        <Input type="text" placeholder="Search for users"/>
        <InputRightElement>
            <SearchIcon color={"gray"}/>
        </InputRightElement>
    </InputGroup>
  )
}

export default SearchUsersInput