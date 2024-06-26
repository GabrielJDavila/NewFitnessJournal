import { Outlet, useNavigate } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import Login from "./Login"
import SignUp from "./SignUp"
import { useEffect, useState } from "react"
import { signIn, signUpUser, auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import ProfileCreation from "../pages/ProfileCreation"


export default function Layout() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    const [loginError, setLoginError] = useState(false)
    const [nonMatchingPasswordError, setNonMatchingPasswordError] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [signUpErrorMessage, setSignUpErrorMessage] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        uid: ""
    })
 
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, user => {
            if(user) {
                setLoggedIn(!!user)
                setCurrentUser(user.uid)
            }
        })
        return () => unsubcribe()
    }, [])

    function handleSignIn(e) {
        e.preventDefault()
        signIn(loginInfo.email, loginInfo.password)
    }

    async function handleSignUp(e) {
        e.preventDefault()
        if(
            /[A-Z]/.test(loginInfo.password) &&
            /[a-z]/.test(loginInfo.password) &&
            /\W/.test(loginInfo.password) &&
            /\d/.test(loginInfo.password) &&
            loginInfo.password !== loginInfo.confirmPassword
        ) {
            flipShowNonMatchingPasswordError()
        } else if(/[A-Z]/.test(loginInfo.password) &&
            /[a-z]/.test(loginInfo.password) &&
            /\W/.test(loginInfo.password) &&
            /\d/.test(loginInfo.password) &&
            loginInfo.password === loginInfo.confirmPassword
        ) {
            const signUpSuccess = await signUpUser(loginInfo)
            setSignUpErrorMessage(signUpSuccess)
        } else {
            flipShowPasswordError()
        }
    }

    function flipShowLogin() {
        setShowLogin(prev => !prev)
        setLoginError(false)
    }

    function flipShowPasswordError() {
        setLoginError(prev => !prev)
    }

    function flipShowNonMatchingPasswordError() {
        setNonMatchingPasswordError(true)
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
                confirmPassword={loginInfo.confirmPassword}
                flipShowLogin={flipShowLogin}
                flipShowPasswordError={flipShowPasswordError}
                flipShowNonMatchingPasswordError={flipShowNonMatchingPasswordError}
                nonMatchingPasswordError={nonMatchingPasswordError}
                loginError={loginError}
                signUpErrorMessage={signUpErrorMessage}
                
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