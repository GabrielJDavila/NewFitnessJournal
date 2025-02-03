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
        password: ""
    })
    const [newSignUpInfo, setNewSignUpInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
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
            /[A-Z]/.test(newSignUpInfo.password) &&
            /[a-z]/.test(newSignUpInfo.password) &&
            /\W/.test(newSignUpInfo.password) &&
            /\d/.test(newSignUpInfo.password) &&
            newSignUpInfo.password !== newSignUpInfo.confirmPassword
        ) {
            flipShowNonMatchingPasswordError()
        } else if(/[A-Z]/.test(newSignUpInfo.password) &&
            /[a-z]/.test(newSignUpInfo.password) &&
            /\W/.test(newSignUpInfo.password) &&
            /\d/.test(newSignUpInfo.password) &&
            newSignUpInfo.password === newSignUpInfo.confirmPassword
        ) {
            const signUpSuccess = await signUpUser(newSignUpInfo)
            setSignUpErrorMessage(signUpSuccess)
        } else {
            flipShowPasswordError()
        }
    }

    function flipShowPassword() {
        setShowPassword(prev => !prev)
    }

    function flipShowLogin() {
        setShowLogin(prev => !prev)
        setLoginInfo({
            email: "",
            password: ""
        })
        setNewSignUpInfo({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        setShowPassword(false)
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

    function handleSignUpChange(e) {
        const {name, value} = e.target
        setNewSignUpInfo(prev => ({
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
                flipShowPassword={flipShowPassword}
                showPassword={showPassword}
            />
        )
    }
    if (!loggedIn && !showLogin) {
        return (
            <SignUp
                handleSignUp={handleSignUp}
                handleChange={handleSignUpChange}
                name={newSignUpInfo.name}
                email={newSignUpInfo.email}
                password={newSignUpInfo.password}
                confirmPassword={newSignUpInfo.confirmPassword}
                flipShowLogin={flipShowLogin}
                flipShowPasswordError={flipShowPasswordError}
                flipShowNonMatchingPasswordError={flipShowNonMatchingPasswordError}
                nonMatchingPasswordError={nonMatchingPasswordError}
                loginError={loginError}
                signUpErrorMessage={signUpErrorMessage}
                flipShowPassword={flipShowPassword}
                showPassword={showPassword}
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