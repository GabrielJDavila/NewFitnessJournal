import { Outlet } from "react-router-dom"
import Header from "./Header"
import { useEffect, useState } from "react"

export default function Layout() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    function handleSignIn(e) {
        e.preventDefault()
        handleSignIn(loginInfo.email, loginInfo.password)
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
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}