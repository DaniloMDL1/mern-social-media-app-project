import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { Container } from "@chakra-ui/react"

const HeaderLayout = () => {
  return (
    <>
        <Header />
        <Container maxW={"620px"} mt={4}>
          <Outlet />
        </Container>
    </>
  )
}

export default HeaderLayout