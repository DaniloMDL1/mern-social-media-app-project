import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import UserProfilePage from "./pages/UserProfilePage"
import UpdateUserProfilePage from "./pages/UpdateUserProfilePage"
import PostPage from "./pages/PostPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import HeaderLayout from "./layouts/HeaderLayout"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"

const App = () => {
  const user = useRecoilValue(userAtom)

  return (
    <>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={user ? <HomePage /> : <Navigate to={"/login"}/>}/>
          <Route path="/profile/:username" element={<UserProfilePage />}/>
          <Route path="/update/profile" element={user ? <UpdateUserProfilePage /> : <Navigate to={"/login"}/>}/>
          <Route path="/post/:id" element={<PostPage />}/>
        </Route>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"}/>}/>
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"}/>}/>
      </Routes>
    </>
  )
}

export default App
