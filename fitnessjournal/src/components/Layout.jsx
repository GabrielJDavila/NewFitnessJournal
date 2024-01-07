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
    const [currentUser, setCurrentUser] = useState({
        uid: ""
    })
    console.log(currentUser)
//     const user = auth.currentUser
//     const userId = user ? user.uid : null
// console.log(user)
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, user => {
            if(user) {
                setLoggedIn(!!user)
                setCurrentUser(user.uid)
                console.log("user is signed in: ", user.uid)
                
            }
        })
        return () => unsubcribe()
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
            <Outlet context={{ currentUser }}/>
        </div>
    )
}