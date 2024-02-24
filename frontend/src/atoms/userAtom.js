import { atom } from "recoil"

const userAtom = atom({
    key: "userAtom",
    default: JSON.parse(localStorage.getItem("socialmedia-user"))
})

export default userAtom