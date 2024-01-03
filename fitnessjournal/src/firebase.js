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
    updateDoc
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
export const categoriesCollection = collection(db, "categories")
export const currentWorkoutList = collection(db, "currentWorkoutList")

// create new user sign up
export function signUpUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user
            console.log(user)
        })
        .catch(e => {
            console.log("error creating user: ", e)
        })
}

// sign in app
export async function signIn(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch(e) {
        alert("error logging in: ", e)
    }
}

// sign out user
export const logout = async () => {
    await signOut(auth)
}

// add new category
export async function addNewCategory(category, collectionType) {
    const capitalizedCat = category.charAt(0).toUpperCase() + category.slice(1)
    try {
        await addDoc(collectionType, {
            name: capitalizedCat
        })
    } catch(e) {
        console.log("error adding doc: ", e)
    }
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

// retrieve sets and reps for current exercise in selection
export async function retrieveCurrentExSetsReps(collectionType) {
    try {
        const workoutSnapshot = await getDocs(collectionType)
        
        const exercises = []

        for(const exDoc of workoutSnapshot.docs) {
            const exId = exDoc.id
            const currentExRef = collection(exDoc.ref, "currentEx")
            const repsSetsQuery = query(currentExRef)
            const repsSetsSnapshot = await getDocs(repsSetsQuery)

            const exerciseData = {
                id: exId,
                name: exDoc.data().name,
                setsReps: []
            }

            repsSetsSnapshot.forEach(set => {
                const setId = set.id
                const { reps, weight } = set.data()

                exerciseData.setsReps.push({
                    setId,
                    reps,
                    weight
                })
            })
            exercises.push(exerciseData)
        }
        return exercises

    } catch(e) {
        console.log("ERROR ERROR ABORT!!!: " , e)
    }

}

// add new exercise to category
export async function addToCategory(name, scheme, weightUnit, collectionType, categoryId) {
    try {
        const categoryDocRef = doc(collectionType, categoryId)
        const exercisesCollectionRef = collection(categoryDocRef, "exercises")
        await addDoc(exercisesCollectionRef, {
            name: name,
            scheme: scheme,
            weightUnit: weightUnit
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

// retrieve single doc from firestore
export async function retrieveDoc(collectionType, itemId) {
    const docRef = doc(collectionType, itemId)
    const docSnap = await getDoc(docRef)
    return docSnap
}

// update category name
export async function editCategoryName(collectionType, docId, newName) {
    try {
        const docRef = doc(collectionType, docId)
        await setDoc(docRef, {
            name: newName
        })
    } catch(e) {
        console.log("error performing edit: ", e)
        throw e
    }
}

// delete category
export async function deleteCategory(collectionType, docId) {
    try {
        const docRef = doc(collectionType, docId)
        await deleteDoc(docRef)
    } catch(e) {
        console.log("error performing edit: ", e)
        throw e
    }
}

// add or udpdate current workout exercises
export async function addUpdateWorkoutList(exerciseId, name, scheme, weightUnit, collectionType) {
    
    try {
        // using exerciseId so it's easier to grab params later for use
        const docRef = doc(collectionType, exerciseId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()) {
            alert("exercise already in workout")
        } else {
            await setDoc(docRef, {
                id: exerciseId,
                name: name,
                scheme: scheme,
                weightUnit: weightUnit
            })
        }
    } catch(e) {
        console.log("error adding exercise: ", e)
    }
}

// add or update sets and reps of current exercises
export async function addSetsReps( exerciseId, weight, reps, collectionType) {
    try {
        // using exerciseId so it's easier to grab params later for use
        const exerciseToBeEdited = doc(collectionType, exerciseId)
        const exerciseDocRef = collection(exerciseToBeEdited, "currentEx")
        await addDoc(exerciseDocRef, {
            weight: weight,
            reps: reps
        })
    } catch(e) {
        console.log("error adding exercise: ", e)
        throw e
    }
}

export async function editSingleSet(exerciseId, setId, newReps, newWeight, collectionType) {
    try {
        const exerciseRef = doc(collectionType, exerciseId)
        const setsRef = collection(exerciseRef, "currentEx")
        const setDocRef = doc(setsRef, setId)

        await updateDoc(setDocRef, {
            reps: newReps,
            weight: newWeight
        })
    } catch(e) {
        console.log("error editing set: ", e)
        throw e
    }
}

export async function deleteSingleSet(collectionType, exerciseId, setId) {
    try {
        const exRef = doc(collectionType, exerciseId)
        const allSetsRef = collection(exRef, "currentEx")
        const setDocRef = doc(allSetsRef, setId)

        await deleteDoc(setDocRef)
    } catch(e) {
        console.log("error deleting set: ", e)
        throw e
    }
}
