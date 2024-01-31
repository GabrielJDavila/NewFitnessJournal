import { Outlet, useNavigate } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import Login from "./Login"
import SignUp from "./SignUp"
import { useEffect, useState } from "react"
import { signIn, signUpUser, auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function Layout() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const [loginError, setLoginError] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    const [currentUser, setCurrentUser] = useState({
        uid: ""
    })

    const navigate = useNavigate()
 
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
        if(/[A-Z]/.test(loginInfo.password) &&
            /[a-z]/.test(loginInfo.password) &&
            /\W/.test(loginInfo.password) &&
            /\d/.test(loginInfo.password)
        ) {
            console.log(`check works, pass is: ${loginInfo.password}`)
            signUpUser(loginInfo.email, loginInfo.password)
            navigate("/")
        } else {
            flipShowPasswordError()
            console.log(`check fails. attempted password: ${loginInfo.password}`)
        }
    }

    function flipShowLogin() {
        setShowLogin(prev => !prev)
        setLoginError(false)
    }

    function flipShowPasswordError() {
        setLoginError(prev => !prev)
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
                flipShowPasswordError={flipShowPasswordError}
                loginError={loginError}
            />
        )
    }
    return (
        <div className="first-layout">
            <Header />
            <div className="main-content">
                <Outlet context={{ currentUser }}/>
            </div>
            <Footer />
        </div>
    )
}