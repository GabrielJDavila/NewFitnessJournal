// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    setDoc,
    doc,
    query,
    updateDoc,
    where,
    serverTimestamp,
    orderBy,
    Timestamp,
    limit
} from "firebase/firestore"
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARBud_Cbnf3MIwdyIWBWWCT8YATfc7qCI",
  authDomain: "fitness-journal-b27da.firebaseapp.com",
  projectId: "fitness-journal-b27da",
  storageBucket: "fitness-journal-b27da.appspot.com",
  messagingSenderId: "719571269462",
  appId: "1:719571269462:web:ee41e29e30507afe7848f7"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const auth = getAuth()

// Initialize firestore references
export const existingCatsCollection = collection(db, "existingCategories")
export const categoriesCollection = collection(db, "categories")
export const currentWorkoutList = collection(db, "currentWorkoutList")
export const usersInDB = collection(db, "users")
export const currentUserLoggedIn = collection(db, "currentUser")

// add user to collection
async function addUserToCollection(collectionType, user, { email, name, age, gender, weight, weightType, height1, heightType1, height2, heightType2 }) {
    try {
        const docRef = doc(collectionType, user)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()) {
            console.log("user exists!")
            return
            
        } else {
            await setDoc(docRef, {
                userId: user,
                email: email,
                name: name,
                age: age,
                gender: gender,
                weight: weight,
                weightType: weightType,
                height1: height1,
                heightType1,
                height2: height2,
                heightType2: heightType2
            })
            // console.log(`added user: ${user}`)
        }
    } catch(e) {
        console.log("error adding user: ", e)
    }
}

// create new user sign up
export async function signUpUser(loginInfo) {
    const email = loginInfo.email
    const password = loginInfo.password
 
    try {
        const q = query(usersInDB, where("email", "==", email))
        const querySnapshot = await getDocs(q)
        // console.log(querySnapshot)

        if(querySnapshot.empty) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user.uid
            await addUserToCollection(usersInDB, user, loginInfo)
            await getExistingCatsAndEx(user, existingCatsCollection, usersInDB)
            return false
        } else {
            return true
        }
    } catch(e) {
        console.error("error creating user: ", e)
    }
    
}

// sign in app
export async function signIn(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user.uid
                addUserToCollection(usersInDB, user)
            })
    }
    catch(e) {
        alert("error logging in: ", e)
    }
}

// sign out user
export const logout = async () => {
    await signOut(auth)
}

export function previousModay() {
    const today = new Date()
    const numMonth = today.getMonth() + 1

    const stringMonth = numMonth <= 9 ? `0${numMonth}` : `${numMonth}`
    const stringDay = today.getDate() <= 9 ? `0${today.getDate()}` : `${today.getDate()}`
   
    const newDateString = `${today.getFullYear()}-${stringMonth}-${stringDay}`

    const currentDayOfWeek = today.getDay()
    const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1
    const getPastMonday = new Date()
    getPastMonday.setDate(today.getDate() - daysToSubtract)
    const timstampToCompare = Timestamp.fromDate(getPastMonday)
    
    return timstampToCompare
}
export async function queryWorkoutLogs(userCollection, userId) {
        const today = new Date()
        // const numMonth = today.getMonth() + 1

        // const stringMonth = numMonth <= 9 ? `0${numMonth}` : `${numMonth}`
        // const stringDay = today.getDate() <= 9 ? `0${today.getDate()}` : `${today.getDate()}`
    
        // const newDateString = `${today.getFullYear()}-${stringMonth}-${stringDay}`

        const currentDayOfWeek = today.getDay()
        const daysToSubtract = currentDayOfWeek
        const getPastSunday = new Date()
        getPastSunday.setDate(today.getDate() - daysToSubtract)
        getPastSunday.setHours(0, 0, 0, 0)
        const timstampToCompare = Timestamp.fromDate(getPastSunday)

        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")

        const q = query(currentWorkoutCollectionRef, where("createdAt", ">", timstampToCompare), orderBy("createdAt", "desc"), limit(7))
        const workoutsSnapshot = await getDocs(q)

        const workoutsArr = []
        for(const dateDoc of workoutsSnapshot.docs) {

            if(dateDoc.data().workoutTime) {
                const loggedWorkout = {
                    id: dateDoc.id,
                    date: dateDoc.data().createdAt.toDate(),
                    workoutTime: dateDoc.data().workoutTime
                }
                workoutsArr.push(loggedWorkout)
            } else {
                const loggedWorkout = {
                    id: dateDoc.id,
                    date: dateDoc.data().createdAt.toDate(),
                }
                workoutsArr.push(loggedWorkout)
            }
        }
       
        return workoutsArr
    // return onSnapshot(q, snapshot => {
    //     onSuccess(snapshot.size)
    // })
}

// search all exercises using the search tool. reference the user's categories collection, then loop through
// all docs and all exercises. Return names that match the input of user as they type.
export async function searchAllExercises(userCollection, userId, searchQuery) {
   
    const userDocRef = doc(userCollection, userId)
    const categoriesCollectionRef = collection(userDocRef, "categories")
    const categoriesQuery = query(categoriesCollectionRef)
    const catsSnapshot = await getDocs(categoriesQuery)
    const exList = []
    for(const catDoc of catsSnapshot.docs) {
        const catDocRef = doc(categoriesCollectionRef, catDoc.id)
        const exListRef = collection(catDocRef, "exercises")
        const exQuery = query(exListRef)
        const exercisesSnapshot = await getDocs(exQuery)

        for(const exDoc of exercisesSnapshot.docs) {
            
            if(exDoc.data().name.toLowerCase().includes(searchQuery.toLowerCase())) {
                
                const exerciseData = {
                    id: exDoc.id,
                    name: exDoc.data().name
                }

                exList.push(exerciseData)
            }
        }
    }
    return exList
}

export async function getExistingCatsAndEx(userId, existingCatsCollection, userCollection) {
    // const existingCatsRef = collection(db, "existingCategories")

    try {
        const categoriesArr = []

        const q = query(existingCatsCollection)
        const categoriesSnapshot = await getDocs(q)

        for(const catDoc of categoriesSnapshot.docs) {
            const categoryName = catDoc.data().category
            const userDocRef = doc(userCollection, userId)
            const categoriesCollectionRef = collection(userDocRef, "categories")
            const catDocId = catDoc.id
            const customCatDocRef = doc(categoriesCollectionRef, catDocId)
            const newCatDocRef = await setDoc(customCatDocRef, {
                name: categoryName
            })
            const exercisesArr = []
            const exRef = collection(catDoc.ref, "exercises")
            const exercisesSnapshot = await getDocs(exRef)
            
            for(const exDoc of exercisesSnapshot.docs) {
                const exName = exDoc.data().exercise

                const exCollectionRef = collection(customCatDocRef, "exercises")
                const userExDocRef = doc(exCollectionRef, exDoc.id)
                await setDoc(userExDocRef, {
                    name: exName
                })

            }

        }
        
        // cloneDataForNewUser(userId, userCollection, categoriesArr)
    } catch(e) {
        console.log("error fetching categories: ", e)
    }
}

export async function addNewCat(userCollection, userId, newCat) {
    const capitalizedCat = newCat.charAt(0).toUpperCase() + newCat.slice(1)
    try {
        const userDocRef = doc(userCollection, userId)
        const categoriesCollectionRef = collection(userDocRef, "categories")

        // Query to check if the category already exists
        const q = query(categoriesCollectionRef, where("name", "==", capitalizedCat))
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty) {
            await addDoc(categoriesCollectionRef, {
                name: capitalizedCat
            })
            console.log(`Category ${capitalizedCat} added successfully.`)
        } else {
            console.log(`Category ${capitalizedCat} already exists.`)
        }
        
    } catch(e) {
        console.log("error creating new category: ", e)
    }
}

// delete category
export async function deleteCategory(userCollection, userId, categoryId) {
    try {
        const userDocRef = doc(userCollection, userId)
        const categoriesCollectionRef = collection(userDocRef, "categories")
        const categoryDocRef = doc(categoriesCollectionRef, categoryId)
        await deleteDoc(categoryDocRef)
    } catch(e) {
        console.log("error performing deletion: ", e)
        throw e
    }
}

// update category name
export async function editCategoryName(userCollection, userId, categoryId, newName) {
    try {
        const userDocRef = doc(userCollection, userId)
        const categoriesCollectionRef = collection(userDocRef, "categories")
        const categoryDocRef = doc(categoriesCollectionRef, categoryId)
        await setDoc(categoryDocRef, {
            name: newName
        })
    } catch(e) {
        console.log("error performing edit: ", e)
        throw e
    }
}

// Get all categories from firestore
export async function getAllCategories(userCollection, userId) {
    try {
        const userDocRef = doc(userCollection, userId)
        const categoriesCollectionRef = collection(userDocRef, "categories")
        const q = query(categoriesCollectionRef)
        const snapshot = await getDocs(q)
        const collections = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        return collections
    } catch(e) {
        console.log("error fetching categories: ", e)
    }
}

// add new exercise to category
export async function addExToCategory(userCollection, userId, name, categoryId) {
    try {
        const userDocRef = doc(userCollection, userId)
        const categoriesCollectionRef = collection(userDocRef, "categories")
        const categoryDocRef = doc(categoriesCollectionRef, categoryId)
        const exercisesCollectionRef = collection(categoryDocRef, "exercises")
        await addDoc(exercisesCollectionRef, {
            name: name
        })
    } catch(e) {
        console.log("error adding doc: ", e)
    }
}

// retrieve categories from firestore
export async function getCategories(collectionName) {
    const q = query(collectionName)
    const snapshot = await getDocs(q)
    const collections = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return collections
}

// retrieve exercises from list of total exercises category
export async function retreiveFromCategory(collectionType, categoryId) {
    try {
        const categoryDocRef = doc(collectionType, categoryId)
        const exercisesCollectionRef = collection(categoryDocRef, "exercises")
        const snapshot = await getDocs(exercisesCollectionRef)
        const exercises = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return exercises
    }catch(e) {
        console.log("error retrieving exercises: ", e)
    }
}

export async function retreiveExFromCategory(userCollection, userId, categoryId) {
    try {
        const userDocRef = doc(userCollection, userId)
        const categoriesCollectionRef = collection(userDocRef, "categories")
        const categoryDocRef = doc(categoriesCollectionRef, categoryId)
        const exercisesCollectionRef = collection(categoryDocRef, "exercises")
        const snapshot = await getDocs(exercisesCollectionRef)
        const exercises = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return exercises
    } catch(e) {
        console.log("error getting exercises: ", e)
    }
}

// retrieve name of selected category
export async function retrieveSelectedCatName(userCollection, userId, categoryId) {
    try {
        const userDocRef = doc(userCollection, userId)
        const categoriesCollectionRef = collection(userDocRef, "categories")
        const categoryDocRef = doc(categoriesCollectionRef, categoryId)
        const snapshot = await getDoc(categoryDocRef)
        const catName = snapshot.data().name
        return catName
    } catch(err) {
        console.error("error fetching category name: ", err)
    }
}

// retrieve categories from firestore
export async function getExCategories(users) {
    const q = query()
    const snapshot = await getDocs(q)
    const collections = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return collections
}

// retrieve single doc from firestore
export async function retrieveDoc(collectionType, itemId) {
    const docRef = doc(collectionType, itemId)
    const docSnap = await getDoc(docRef)
    return docSnap
}

// add or udpdate current workout exercises
export async function addUpdateWorkoutList(exerciseId, name, userCollection, userId) {
    try {
        // using exerciseId so it's easier to grab params later for use
        const date = new Date().toISOString().split("T")[0]
        // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        // const formattedDate = new Date().toLocaleDateString("en-US", {
        //     timeZone: userTimeZone
        // })
        // console.log(formattedDate)
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, date)

        await setDoc(dateOfWorkoutDocRef, {
            createdAt: serverTimestamp()
        })

        const selectedExListCollectionRef = collection(dateOfWorkoutDocRef, "exList")
        const exDocRef = doc(selectedExListCollectionRef, exerciseId)
        const docSnap = await getDoc(exDocRef)

        if(docSnap.exists()) {
            alert("exercise already in workout")
        } else {

            const snapshot = await getDocs(selectedExListCollectionRef)
            const currentIndex = snapshot.docs.length

            await setDoc(exDocRef, {
                id: exerciseId,
                name: name,
                createdAt: serverTimestamp(),
                index: currentIndex
            })
        }
    } catch(e) {
        console.log("error adding exercise: ", e)
    }
}

export async function saveTimerWorkout(userCollection, userId, date, workoutTime) {
    const adjustedDate = date.toISOString().split("T")[0]
    try {
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, adjustedDate)

        await updateDoc(dateOfWorkoutDocRef, {
            workoutTime: workoutTime
        })
    } catch(e) {
        console.error("error adding workout time: ", e)
    }
}

export async function reOrderWorkoutList(exerciseId, newindex, userCollection, userId, date) {
    
    const adjustedDate = date.toISOString().split("T")[0]
    try {
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, adjustedDate)
        const selectedExListCollectionRef = collection(dateOfWorkoutDocRef, "exList")

        // get all docs in collection
        const snapshot = await getDocs(selectedExListCollectionRef)
        // store all docs in array
        const documents = snapshot.docs.map(doc => doc)
        // find doc that corresponds to dragged exerciseId
        const draggedDoc = documents.find(doc => doc.id === exerciseId)
        // calculate the old index of dragged doc
        const oldIndex = documents.indexOf(draggedDoc)
        // remove dragged doc from array
        documents.splice(oldIndex, 1)
        // insert dragged doc at new index
        documents.splice(newindex, 0, draggedDoc)
        // update the indices of all docs in array
        for(let i = 0; i < documents.length; i++) {
            const doc = documents[i]
            await updateDoc(doc.ref, {index: i})
        }
    } catch(e) {
        console.log("error adding exercise: ", e)
    }
}

// retrieve sets and reps for current exercise in selection
export async function retrieveCurrentExSetsReps(userCollection, userId, selectedDate) {
    try {
        const dateString = selectedDate.toISOString().split("T")[0]
        
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, dateString)
        const dateDocSnap = await getDoc(dateOfWorkoutDocRef)

        if(!dateDocSnap.exists()) {
            console.log("no workout found for this date.")
            alert("no workout found for this date.")
        }

        const exercisesCollectionRef = collection(dateOfWorkoutDocRef, "exList")
        const exListQuery = query(exercisesCollectionRef, orderBy("index", "asc"))
        const exerciseSnapshot = await getDocs(exListQuery)
        const exercises = []

        for(const exDoc of exerciseSnapshot.docs) {
            const exId = exDoc.id
            const currentExRef = collection(exDoc.ref, "currentEx")
            const repsSetsQuery = query(currentExRef, orderBy("createdAt"))
            const repsSetsSnapshot = await getDocs(repsSetsQuery)

            const exerciseData = {
                id: exId,
                name: exDoc.data().name,
                setsReps: []
            }

            repsSetsSnapshot.forEach(set => {
                const setId = set.id
                const { createdAt, reps, weight, weightType } = set.data()

                exerciseData.setsReps.push({
                    setId,
                    createdAt,
                    reps,
                    weight,
                    weightType
                })
            })
            exercises.push(exerciseData)
        }
        return exercises

    } catch(e) {
        console.log("ERROR ERROR ABORT!!!: " , e)
    }

}

// add or update sets and reps of current exercises
export async function addSetsReps( exerciseId, weight, reps, weightType, userCollection, userId, date) {
    try {
        // using exerciseId so it's easier to grab params later for use
        // const dateString = new Date().toISOString().split("T")[0]
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, date)

        const selectedExListCollectionRef = collection(dateOfWorkoutDocRef, "exList")
        const exDocRef = doc(selectedExListCollectionRef, exerciseId)

        // const exDocRef = doc(currentWorkoutCollectionRef, exerciseId)
        const currentExCollectionRef = collection(exDocRef, "currentEx")
        await addDoc(currentExCollectionRef, {
            weight: weight,
            weightType: weightType,
            reps: reps,
            createdAt: serverTimestamp()
        })

    } catch(e) {
        console.log("error adding exercise: ", e)
        throw e
    }
}

export async function editSingleSet(exerciseId, setId, newReps, newWeight, userCollection, userId, selectedDate) {
    // const dateString = selectedDate.toISOString().split("T")[0]
    // console.log(dateString)
    try {
        const dateString = selectedDate.toISOString().split("T")[0]
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, dateString)
        const exercisesCollectionRef = collection(dateOfWorkoutDocRef, "exList")
        const exDocRef = doc(exercisesCollectionRef, exerciseId)
        const currentExRef = collection(exDocRef, "currentEx")
        const setDocRef = doc(currentExRef, setId)

        await updateDoc(setDocRef, {
            reps: newReps,
            weight: newWeight
        })
    } catch(e) {
        console.log("error editing set: ", e)
        throw e
    }
}

export async function deleteSingleSet(userCollection, userId, selectedDate, exerciseId, setId) {
    try {
        const dateString = selectedDate.toISOString().split("T")[0]
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, dateString)
        const exercisesCollectionRef = collection(dateOfWorkoutDocRef, "exList")
        const exDocRef = doc(exercisesCollectionRef, exerciseId)
        const currentExRef = collection(exDocRef, "currentEx")
        const setDocRef = doc(currentExRef, setId)

        await deleteDoc(setDocRef)
    } catch(e) {
        console.log("error deleting set: ", e)
        throw e
    }
}

// delete category
export async function deleteEx(userCollection, userId, selectedDate, exerciseId) {
    try {

        const dateString = selectedDate.toISOString().split("T")[0]
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, dateString)
        const exercisesCollectionRef = collection(dateOfWorkoutDocRef, "exList")
        const exDocRef = doc(exercisesCollectionRef, exerciseId)
        const setsRepsCollectionRef = collection(exDocRef, "currentEx")
        const setsRepsSnapshot = await getDocs(setsRepsCollectionRef)
        // const currentExListSnapshot = await getDocs(exercisesCollectionRef)

        for(const exDoc of setsRepsSnapshot.docs) {
            // const exId = exDoc.id
            const currentExRef = collection(exDoc.ref, "currentEx")
            const repsSetsSnapshot = await getDocs(currentExRef)
            for(const setDoc of repsSetsSnapshot.docs) {
                await deleteDoc(setDoc.ref)
            }
            await deleteDoc(exDoc.ref)
        }
        await deleteDoc(exDocRef)
    } catch(e) {
        console.log("error performing deletion: ", e)
        throw e
    }
}

// delete all exercises and sets within a selected day
export async function deleteAllEx(userCollection, userId, selectedDate) {
    try {
        const dateString = selectedDate.toISOString().split("T")[0]
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, dateString)
        const exercisesCollectionRef = collection(dateOfWorkoutDocRef, "exList")
        const currentExListSnapshot = await getDocs(exercisesCollectionRef)

        for(const exDoc of currentExListSnapshot.docs) {
            // const exId = exDoc.id
            const currentExRef = collection(exDoc.ref, "currentEx")
            const repsSetsSnapshot = await getDocs(currentExRef)
            for(const setDoc of repsSetsSnapshot.docs) {
                await deleteDoc(setDoc.ref)
            }
            await deleteDoc(exDoc.ref)
        }

    } catch(e) {
        console.log("error deleting workout: ", e)
    }
}
