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
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
        name: "",
        age: "",
        gender: "",
        weight: "",
        weightType: "",
        height1: "",
        heightType1: "",
        height2: "",
        heightType2: ""
    })
    const [signUpErrorMessage, setSignUpErrorMessage] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        uid: ""
    })
    console.log(signUpErrorMessage)
 
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

    async function handleSignUp(e) {
        e.preventDefault()
        if(/[A-Z]/.test(loginInfo.password) &&
            /[a-z]/.test(loginInfo.password) &&
            /\W/.test(loginInfo.password) &&
            /\d/.test(loginInfo.password)
        ) {
            console.log(`check works, pass is: ${loginInfo.password}`)
            const signUpSuccess = await signUpUser(loginInfo)
            setSignUpErrorMessage(signUpSuccess)
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
                name={loginInfo.name}
                gender={loginInfo.gender}
                weight={loginInfo.weight}
                weightType={loginInfo.weightType}
                height1={loginInfo.height1}
                heightType1={loginInfo.heightType1}
                height2={loginInfo.height2}
                heightType2={loginInfo.heightType2}
                flipShowLogin={flipShowLogin}
                flipShowPasswordError={flipShowPasswordError}
                loginError={loginError}
                signUpErrorMessage={signUpErrorMessage}
                
            />
        )
    }

    // if (renderProfileCreation && !loggedIn) {
    //     return (
    //         <ProfileCreation
    //             handleSignUp={handleSignUp}
    //             continueWithProfileCreation={continueWithProfileCreation}
    //             renderProfileForm={renderProfileForm}
    //         />
    //     )
    // }
   
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