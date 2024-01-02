import { Outlet } from "react-router-dom"
import Header from "./Header"
import Login from "./Login"
import { useEffect, useState } from "react"
import { signIn, auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function Layout() {
    const [loggedIn, setLoggedIn] = useState(false)

    function handleSignIn(e) {
        e.preventDefault()
        signIn(loginInfo.email, loginInfo.password)
    }

    // useEffect(() => {
    //     const monitorAuthState = async () => {
    //         onAuthStateChanged(auth, user => {
    //             if(user) {
    //                 setLoggedIn(!!user)
    //             }
    //         })
    //     }
    // }, [])
    if(!loggedIn) {
        return (
            <Login/>
        )
    }
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}