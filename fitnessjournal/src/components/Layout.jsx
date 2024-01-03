import { Outlet } from "react-router-dom"
import Header from "./Header"
import Login from "./Login"
import SignUp from "./SignUp"
import { useEffect, useState } from "react"
import { signIn, signUpUser, auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function Layout() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    console.log(loginInfo)
    useEffect(() => {
        const monitorAuthState = async () => {
            onAuthStateChanged(auth, user => {
                if(user) {
                    setLoggedIn(!!user)
                }
            })
        }
        monitorAuthState()
    }, [])

    function handleSignIn(e) {
        e.preventDefault()
        signIn(loginInfo.email, loginInfo.password)
    }

    function handleSignUp(e) {
        e.preventDefault()
        signUpUser(loginInfo.email, loginInfo.password)
    }

    function flipShowLogin() {
        setShowLogin(prev => !prev)
    }

    function handleChange(e) {
        const {name, value} = e.target
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    if(!loggedIn && showLogin) {
        return (
            <Login
                handleSignIn={handleSignIn}
                handleChange={handleChange}
                email={loginInfo.email}
                password={loginInfo.password}
                flipShowLogin={flipShowLogin}
            />
        )
    }
    if (!loggedIn && !showLogin) {
        return (
            <SignUp
                handleSignUp={handleSignUp}
                handleChange={handleChange}
                email={loginInfo.email}
                password={loginInfo.password}
                flipShowLogin={flipShowLogin}
            />
        )
    }
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}