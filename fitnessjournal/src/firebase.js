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
    query
} from "firebase/firestore"
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

// Initialize firestore references
export const categoriesCollection = collection(db, "categories")
export const currentWorkoutList = collection(db, "currentWorkoutList")


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

// retrieve exercises for a category
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
        const docRef = doc(collectionType, name)
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