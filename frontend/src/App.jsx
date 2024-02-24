import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import UserProfilePage from "./pages/UserProfilePage"
import UpdateUserProfilePage from "./pages/UpdateUserProfilePage"
import PostPage from "./pages/PostPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import HeaderLayout from "./layouts/HeaderLayout"

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/profile/:username" element={<UserProfilePage />}/>
          <Route path="/update/profile" element={<UpdateUserProfilePage />}/>
          <Route path="/post/:id" element={<PostPage />}/>
        </Route>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
      </Routes>
    </>
  )
}

export default App
