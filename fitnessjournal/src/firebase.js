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
    Timestamp
} from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
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
async function addUserToCollection(collectionType, user) {
    try {
        const docRef = doc(collectionType, user)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()) {
            console.log("user exists")
            return
            
        } else {
            await setDoc(docRef, {
                userId: user
            })
            console.log(`added user: ${user}`)
        }
    } catch(e) {
        console.log("error adding user: ", e)
    }
}

// create new user sign up
export function signUpUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user.uid
            addUserToCollection(usersInDB, user)

            getExistingCatsAndEx(user, existingCatsCollection, usersInDB)
                .then(() => {
                    console.log("Default data successfully cloned for user: ", user)
                })
                .catch(err => {
                    console.error("error cloning data: ", err)
                })
        })
        .catch(e => {
            console.log("error creating user: ", e)
        })
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

export async function getExistingCatsAndEx(userId, existingCatsCollection, userCollection) {

    try {

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
<<<<<<< Updated upstream
                const categoriesCollectionRef2 = collection(userDocRef, "categories")
                const userCatDocRef = doc(categoriesCollectionRef2, customCatDocRef)
                const exCollectionRef = (userCatDocRef, "exercises")
                await addDoc(exCollectionRef, {
                    exercise: exName
                })
                
                console.log([catDoc.id, exName])
=======
                const exCollectionRef = collection(customCatDocRef, "exercises")
                const userExDocRef = doc(exCollectionRef, exDoc.id)
                await setDoc(userExDocRef, {
                    name: exName
                })
>>>>>>> Stashed changes
            }

        }
    } catch(e) {
        console.log("error fetching categories: ", e)
    }
}

<<<<<<< Updated upstream
export async function cloneDataForNewUser(userId, userCollection, clonedData) {
    try {
        const userDocRef = doc(userCollection, userId)
        const categoriesCollectionRef = collection(userDocRef, "categories")
        console.log(clonedData)
    } catch(e) {
        console.log("error cloning data: ", e)
    }
}
=======
>>>>>>> Stashed changes

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
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, date)
        const selectedExListCollectionRef = collection(dateOfWorkoutDocRef, "exList")
        const exDocRef = doc(selectedExListCollectionRef, exerciseId)
        const docSnap = await getDoc(exDocRef)

        if(docSnap.exists()) {
            alert("exercise already in workout")
        } else {
            await setDoc(exDocRef, {
                id: exerciseId,
                name: name
            })
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

        if(dateDocSnap.exists()) {
            console.log("no workout found for this date.")
            alert("no workout found for this date.")
        }

        // Create start and end timestamps for selected date
        // const startOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
        // const endOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1)
        // const startTimestamp = Timestamp.fromDate(startOfDay)
        // const endTimestamp = Timestamp.fromDate(endOfDay)

        // const workoutQuery = query(currentWorkoutCollectionRef, where("createdAt", ">=", startTimestamp), where("createdAt", "<", endTimestamp))
        // const workoutSnapshot = await getDocs(workoutQuery)

        // const exDocRef = doc(currentWorkoutCollectionRef)
        // const workoutSnapshot = await getDocs(currentWorkoutCollectionRef)
        
        // const workoutSnapshot = await getDocs(collectionType)

        const exercisesCollectionRef = collection(dateOfWorkoutDocRef, "exList")
        const exerciseSnapshot = await getDocs(exercisesCollectionRef)
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
                console.log(set.data())

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
console.log(new Date())
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

// export async function editSingleSet(exerciseId, setId, newReps, newWeight, userCollection, userId) {
//     try {
//         const userDocRef = doc(userCollection, userId)
//         const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
//         const exDocRef = doc(currentWorkoutCollectionRef, exerciseId)
//         const currentExRef = collection(exDocRef, "currentEx")
//         const setDocRef = doc(currentExRef, setId)

//         await updateDoc(setDocRef, {
//             reps: newReps,
//             weight: newWeight
//         })
//     } catch(e) {
//         console.log("error editing set: ", e)
//         throw e
//     }
// }

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
        // const userDocRef = doc(userCollection, userId)
        // const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        // const exDocRef = doc(currentWorkoutCollectionRef, exerciseId)
        // await deleteDoc(exDocRef)

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

        // for(const exDoc of exerciseSnapshot.docs) {
        //     const exId = exDoc.id
        //     const currentExRef = collection(exDoc.ref, "currentEx")
        //     const repsSetsQuery = query(currentExRef, orderBy("createdAt"))
        //     const repsSetsSnapshot = await getDocs(repsSetsQuery)

        //     const exerciseData = {
        //         id: exId,
        //         name: exDoc.data().name,
        //         setsReps: []
        //     }

        //     repsSetsSnapshot.forEach(set => {
        //         const setId = set.id
        //         const { createdAt, reps, weight, weightType } = set.data()
        //         console.log(set.data())

        //         exerciseData.setsReps.push({
        //             setId,
        //             createdAt,
        //             reps,
        //             weight,
        //             weightType
        //         })
        //     })
        //     exercises.push(exerciseData)
        // }
        // const exDocRef = doc(currentWorkoutCollectionRef, exerciseId)
    } catch(e) {
        console.log("error deleting workout: ", e)
    }
}
