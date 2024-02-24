import { useState } from "react"
import { useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"
import useShowToast from "./useShowToast"

const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false)
    const setUser = useSetRecoilState(userAtom)
    const showToast = useShowToast()

    const handleLogout = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()

            if(data.error) {
                showToast("Error", data.error, "error")
                return
            }

            localStorage.removeItem("socialmedia-user")
            setUser(null)
            
        } catch(error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        handleLogout
    }
}

export default useLogout