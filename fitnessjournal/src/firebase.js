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

// get user info
export async function getUserInfo(userId) {
    try {
        const userDocRef = doc(usersInDB, userId)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            return docSnap.data()
        } 
    } catch(err) {
        console.error("error getting user info: ", err)
    }
}

// edit user info
export async function editUserInfo(userId, name, email, gender, age, height, weight) {
    try {
        const userDocRef = doc(usersInDB, userId)
        // const docSnap = await getDoc(userDocRef)

        // if(!docSnap.exists()) {

        // }
        await setDoc(userDocRef, {
            name: name,
            email: email,
            gender: gender,
            age: age,
            height1: height,
            weight: weight
        })
        console.log("success")
    } catch(err) {
        console.error("error editing user info: ", err)
    }
}

export async function queryWorkoutLogs(userCollection, userId) {
        const today = new Date()

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
        const selectedDate = localStorage.getItem("selectedDate")
        const date = new Date(selectedDate).toISOString().split("T")[0]
        
        console.log(date)
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
            // alert("exercise already in workout")
            return "exercise already added to workout!"
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
        const docSnap = await getDoc(dateOfWorkoutDocRef)

        if(!docSnap.exists) {
            console.log("doc doesnt exist yo")
            return
        } else {
            await updateDoc(dateOfWorkoutDocRef, {
                workoutTime: workoutTime
            })
        }
        
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

// retrieve latestPR set data from firestore to showcase in dashboard
export async function grabLatestPR(userCollection, userId) {
    try {
        const userDocRef = doc(userCollection, userId)
        const latestPRref = collection(userDocRef, "latestPRs")
        const prDocsQuery = query(latestPRref, orderBy("createdAt", "desc"), limit(1))
        const prDocsSnapshot = await getDocs(prDocsQuery)
        let prData = {}
        for(const pr of prDocsSnapshot.docs) {
   
            prData = {
                id: pr.data().setId,
                name: pr.data().exName,
                weight: pr.data().weight,
                reps: pr.data().reps
            }

        }
        return prData
    } catch(e) {
        console.error("error retrieving PR data: ", e)
    }
}

// collect set data if user got a PR, and then send to firestore for later use
async function sendPRtoDash(userCollection, userId, name, exerciseId, weight, reps, createdAt) {
   
    try {
        const userDocRef = doc(userCollection, userId)
        const latestPRref = collection(userDocRef, "latestPRs")
        const exSetDocRef = doc(latestPRref, exerciseId)
        const docSnap = await getDoc(exSetDocRef)
        if(docSnap.exists()) {
            await updateDoc(exSetDocRef, {
                exName: name,
                exId: exerciseId,
                weight: weight,
                reps: reps,
                createdAt: createdAt
            })
        } else {
            await setDoc(exSetDocRef, {
                exName: name,
                exId: exerciseId,
                weight: weight,
                reps: reps,
                createdAt: createdAt
            })
        }

    } catch(e) {
        console.error("error sending ", e)
    }
}

// need to implement sendPRToDash
// A way to make the code easier to load: render only the data that changes.
// so when a user makes a change like adding an exercise, adding a set, retrieve the changed data,
// but keep the old data. I can perhaps do this by saving the inital data to local storage?
export async function retrieveCurrentExSetsRepsAndPRs(userCollection, userId, selectedDate) {
    try {
        const dateString = selectedDate.toISOString().split("T")[0]
        const userDocRef = doc(userCollection, userId)
        const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
        const latestPRsCollectionRef = collection(userDocRef, "latestPRs")
        const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, dateString)
        const dateDocSnap = await getDoc(dateOfWorkoutDocRef)
        if(!dateDocSnap.exists()) {
            console.log("no workout for this date.")
            return []
            
        }
        const exercisesCollectionRef = collection(dateOfWorkoutDocRef, "exList")
        const exListQuery = query(exercisesCollectionRef, orderBy("index", "asc"))
        const exerciseSnapshot = await getDocs(exListQuery)
        const exercisesPromises = []

        exerciseSnapshot.forEach(exDoc => {
            exercisesPromises.push(fetchExData(exDoc))
        })

        const exercises = await Promise.all(exercisesPromises)
        const exercisePRs = await fetchAllExPRs(currentWorkoutCollectionRef, exercisesCollectionRef, latestPRsCollectionRef, userCollection, userId)

        for(const exercise of exercises) {
            if(exercise.setsReps.length > 0) {
                let existingPR = exercisePRs.find(pr => pr.exId === exercise.id)
                for(const set of exercise.setsReps) {
                        let isPR = false
                        if(!existingPR) {
                            isPR = true
                            existingPR = {...set}
                        } else {
                            if((set.weight > existingPR.weight) || (set.reps > existingPR.reps && set.weight <= existingPR.weight)) {
                                
                                isPR = true
                                existingPR = {...set}                      
                            // if matching name, compare weight and reps combinations for PRs.
                            // if a suitable PR, push to exercisePRs. If not, do nothing.
                            } 
                        }
                        if(isPR) {
                            await sendPRtoDash(userCollection, userId, exercise.name, exercise.id, set.weight, set.reps, set.createdAt)
                            set.isPR = true
                            for(const otherSet of exercise.setsReps) {
                                if(otherSet !== set) {
                                    otherSet.isPR = false
                                }
                            }
                        }
                }
            } else {
                console.log(`no sets yet for ${exercise.name}`)
            }
        }
        return { exercises, exercisePRs }
    } catch(error) {
        console.error("error fetching current workout data and PRs: ", error)
    }
}
// export async function retrieveCurrentExSetsRepsAndPRs(userCollection, userId, selectedDate) {
//     try {
//         const dateString = selectedDate.toISOString().split("T")[0]
//         const userDocRef = doc(userCollection, userId)
//         const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
//         const latestPRsCollectionRef = collection(userDocRef, "latestPRs")
//         const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, dateString)
//         const dateDocSnap = await getDoc(dateOfWorkoutDocRef)
//         if(!dateDocSnap.exists()) {
//             console.log("no workout for this date.")
//             return []
            
//         }
//         const exercisesCollectionRef = collection(dateOfWorkoutDocRef, "exList")
//         const exListQuery = query(exercisesCollectionRef, orderBy("index", "asc"))
//         const exerciseSnapshot = await getDocs(exListQuery)
//         const exercisesPromises = []

//         exerciseSnapshot.forEach(exDoc => {
//             exercisesPromises.push(fetchExData(exDoc))
//         })

//         const exercises = await Promise.all(exercisesPromises)
//         const exercisePRs = await fetchAllExPRs(currentWorkoutCollectionRef, exercisesCollectionRef, latestPRsCollectionRef, userCollection, userId)
//         console.log(exercisePRs)
//         for(const exercise of exercises) {
            
//             if(exercise.setsReps.length > 0) {
//                 for(const set of exercise.setsReps) {
//                     for(let i = 0; i < exercisePRs.length; i++) {
//                         console.log(exercisePRs[i].weight, set.weight)
//                         if((exercise.id === exercisePRs[i].exId && (set.weight > exercisePRs[i].weight) && (set.createdAt.seconds > exercisePRs[i].createdAt.seconds)) || (exercise.id === exercisePRs[i].exId && (set.reps > exercisePRs[i].reps && set.weight <= exercisePRs[i].weight) && (set.createdAt.seconds > exercisePRs[i].createdAt.seconds))) {
//                             console.log(set.createdAt.seconds, exercisePRs[i].createdAt.seconds)
//                             set.isPR = true
//                             console.log("set is PR")
//                             // if matching name, compare weight and reps combinations for PRs.
//                             // if a suitable PR, push to exercisePRs. If not, do nothing.

//                         }
//                         if(set.isPR === true && (set.createdAt.seconds > exercisePRs[i].createdAt.seconds)) {
//                             console.log("sending set to PRsList")
//                             sendPRtoDash(userCollection, userId, exercise.name, exercise.id, set.weight, set.reps, set.createdAt)
//                         } else if(exercise.id === exercisePRs[i].exId && ((set.weight <= exercisePRs[i].weight) || (set.reps <= exercisePRs[i].reps)) ) {
//                             set.isPR = false
//                             console.log("set is not PR")
//                         }
                        
//                         // if(exercise.id === exercisePRs[i].exId && (set.reps > exercisePRs[i].reps && set.weight <= exercisePRs[i].weight) && set.isPR === false) {
                       
//                         //      set.isPR = true
                            
//                         // } else {

//                         // }
//                         // sendPRtoDash(userCollection, userId, exercise.name, exercise.id, set.weight, set.reps, set.createdAt)
//                     }
//                 }
//             } else {
//                 console.log(`no sets yet for ${exercise.name}`)
//             }
//         }
//         console.log(exercises, exercisePRs)
//         return { exercises, exercisePRs }
//     } catch(error) {
//         console.error("error fetching current workout data and PRs: ", error)
//     }
// }

async function fetchExData(exDoc) {
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
                    weightType,
                    isPR: false // initialize isPR as false
                })
            })
            return exerciseData
}

async function fetchAllExPRs(exercisesCollectionRef, latestPRsCollectionRef) {
    const exListQuery = query(exercisesCollectionRef, orderBy("index", "asc"))
    const exerciseSnapshot = await getDocs(exListQuery)
    const PRsQuery = query(latestPRsCollectionRef)
    const PRsSnapshot = await getDocs(PRsQuery)
    let sets = []
    let PRsInDB = []
    
    PRsSnapshot.forEach(doc => {
        PRsInDB.push(doc.data())
    })
        // iterate through exercises and add each current set to PRs, since there are no current PRs anyway.
        // Since there are no PRs, any new set is technically a "PR". Push the set object to PRsInDB, make sure
        // the data types match the types returned in above functions.

        for(const exercise of exerciseSnapshot.docs) {
            const repsAndSetsRef = collection(exercise.ref, "currentEx")
            const currentExQuery = query(repsAndSetsRef)
            const currentExSnapshot = await getDocs(currentExQuery)
            currentExSnapshot.forEach(doc => {
                const weight = Number(doc.data().weight)
                const reps = Number(doc.data().reps)
                const SetDataObject = {
                    exId: exercise.id,
                    createdAt: doc.data().createdAt,
                    exName: exercise.data().name,
                    weight: weight,
                    reps: reps
                }
                // check and see if set is in PRsInDB. We don't want copies of same set! filter out duplicates?
                const existingExerciseIndex = PRsInDB.findIndex(item => item.exId === exercise.id)
                if(existingExerciseIndex === -1) {
                    PRsInDB.push(SetDataObject)
                } else {
                    console.log(PRsInDB[existingExerciseIndex])
                }
                
            })
        }
        console.log("nothing in PRsInDB!")
    return PRsInDB 
}

// retrieve sets and reps for current exercise in selection
// export async function retrieveCurrentExSetsReps(userCollection, userId, selectedDate) {
//     try {
//         const dateString = selectedDate.toISOString().split("T")[0]
//         const data = []
//         const userDocRef = doc(userCollection, userId)
//         const currentWorkoutCollectionRef = collection(userDocRef, "currentWorkout")
//         const dateOfWorkoutDocRef = doc(currentWorkoutCollectionRef, dateString)
//         const dateDocSnap = await getDoc(dateOfWorkoutDocRef)
//         if(!dateDocSnap.exists()) {
//             console.log("no workout for this date.")
//             return []
            
//         }

//         const exercisesCollectionRef = collection(dateOfWorkoutDocRef, "exList")
//         const exListQuery = query(exercisesCollectionRef, orderBy("index", "asc"))
//         const exerciseSnapshot = await getDocs(exListQuery)
//         const exercises = []

//         for(const exDoc of exerciseSnapshot.docs) {
//             const exId = exDoc.id
//             const currentExRef = collection(exDoc.ref, "currentEx")
//             const repsSetsQuery = query(currentExRef, orderBy("createdAt"))
//             const repsSetsSnapshot = await getDocs(repsSetsQuery)

//             const exerciseData = {
//                 id: exId,
//                 name: exDoc.data().name,
//                 setsReps: []

//             }

//             repsSetsSnapshot.forEach(set => {
//                 const setId = set.id
//                 const { createdAt, reps, weight, weightType } = set.data()
//                 exerciseData.setsReps.push({
//                     setId,
//                     createdAt,
//                     reps,
//                     weight,
//                     weightType,
//                     isWeightPR: false,
//                     isRepsPR: false // initialize isPR as false
//                 })
//             })
//             exercises.push(exerciseData)
//         }

//         const currWorkoutQuery = query(currentWorkoutCollectionRef)
//         const currWorkoutSnapshot = await getDocs(currWorkoutQuery)
//         let exercisePRs = []
//         for(const workout of currWorkoutSnapshot.docs) {
//             const exercisesCollectionRef = collection(workout.ref, "exList")
//             const exListQuery = query(exercisesCollectionRef)
//             const exListSnapshot = await getDocs(exListQuery)

//             for(const exercise of exListSnapshot.docs) {
//                 console.log(exercise.data().name)
//                 const repsAndSetsRef = collection(exercise.ref, "currentEx")
//                 const currentExQuery = query(repsAndSetsRef)
//                 const currentExSnapshot = await getDocs(currentExQuery)
//                 currentExSnapshot.forEach(doc => {
//                     const weight = doc.data().weight
//                     const reps = doc.data().reps
//                     const PRsDataObject = {
//                         id: exercise.id,
//                         maxWeight: weight,
//                         maxReps: reps
//                     }
//                     console.log(exercise.id, PRsDataObject.id)

//                     const existingExerciseIndex = exercisePRs.findIndex(item => item.id === exercise.id)
//                     console.log(existingExerciseIndex)
                    
//                     if(existingExerciseIndex === -1) {
//                         exercisePRs.push(PRsDataObject)
//                     } else {
//                         if(weight > exercisePRs[existingExerciseIndex].maxWeight) {
//                             exercisePRs[existingExerciseIndex].maxWeight = weight
//                         }
//                         if(reps > exercisePRs[existingExerciseIndex].maxReps) {
//                             exercisePRs[existingExerciseIndex].maxReps = reps
//                         }
//                     }
//                 })
//             }
//         }
//         data.push(exercisePRs, exercises)
//         return exercises
//     } catch(e) {
//         console.log("ERROR ERROR ABORT!!!: " , e)
//     }

// }
        
        // const latestPRref = collection(userDocRef, "latestPR")
        // const prSnapshot = await getDocs(latestPRref)
        // const prs = prSnapshot.empty ? [] : prSnapshot.docs.map(doc => doc.data())
    
        // for(const exercise of exercises) {
        //     let prData = prs.find(pr => pr.exName === exercise.name)
            // console.log(exercise)
            
            // Issue might be that I'm initializing weight and reps
            // with 0. Anything more than 0 will be considered PR?
            // So I need to add current sets weight and reps to PR
            // data or find a better way to compare.
            // if(!prData) {
            //     prData = {
            //         exName: exercise.name,
            //         weight: 0,
            //         reps: 0,
            //         exId: exercise.id,
            //         setId: null,
            //         createdAt: null
            //     }
            //     prs.push(prData)
            // }

            // COMPARE NEW SET TO PR SET THAT MATCHES find out how to do this better
            // for(const set of exercise.setsReps) {
            //     for(const prSet of prs) {
            //         if(prSet.setId === set.setId) {
            //             console.log(prSet.weight, set.weight)
            //         }
            //         if(parseInt(set.weight) > parseInt(prSet.weight)) {
            //             set.isWeightPR = true
            //         }
            //         if(parseInt(set.reps) > parseInt(prSet.reps)) {
            //             set.isRepsPR = true
            //         }
            //         if(set.isWeightPR || set.isRepsPR) {
            //             sendPRtoDash(userCollection, userId, exercise.name, set.setId, set.weight, set.reps, set.createdAt)
            //         } else {
            //             set.isWeightPR = false
            //             set.isRepsPR = false
            //         }

            //     }

            // }
        // }

        // for(const pr of prs) {
        //     const prDocRef = doc(latestPRref, pr.id ? pr.id : doc().id)
        //     await setDoc(prDocRef, pr)
        // }
        // check for PRs in sets and reps (NEED TO IMPROVE PERFORMANCE HERE) 
        // const currWorkoutQuery = query(currentWorkoutCollectionRef)
        // const currWorkoutSnapshot = await getDocs(currWorkoutQuery)
        // const exercisePRs = []
        
        // for(const workout of currWorkoutSnapshot.docs) {
        //     const exercisesCollectionRef = collection(workout.ref, "exList")
        //     const exListQuery = query(exercisesCollectionRef)
        //     const exListSnapshot = await getDocs(exListQuery)

        //     for(const exercise of exListSnapshot.docs) {
        //         const repsAndSetsRef = collection(exercise.ref, "currentEx")
        //         const currentExQuery = query(repsAndSetsRef)
        //         const currentExSnapshot = await getDocs(currentExQuery)
        //         currentExSnapshot.forEach(doc => {
        //             const weight = doc.data().weight
        //             const reps = doc.data().reps
        //             console.log(exercise.data().name)
        //             const PRsDataObject = {
        //                 id: exercise.id,
        //                 maxWeight: weight,
        //                 maxReps: reps
        //             }

        //             const existingExerciseIndex = exercisePRs.findIndex(item => item.id === exercise.id)
        //             console.log(exercisePRs)
                    
        //             if(existingExerciseIndex === -1) {
        //                 exercisePRs.push(PRsDataObject)
        //             } else {
        //                 if(weight > exercisePRs[existingExerciseIndex].maxWeight) {
        //                     exercisePRs[existingExerciseIndex].maxWeight = weight
        //                 }
        //                 if(reps > exercisePRs[existingExerciseIndex].maxReps) {
        //                     exercisePRs[existingExerciseIndex].maxReps = reps
        //                 }
        //             }
        //         })
        //     }
        // }
        
        // for(const item of exercises) {
        
        //     for(const pr of exercisePRs) {
        //         if(item.id === pr.id) {
        //             // console.log("matches", item.id, pr.id)
                    
        //             for(const set of item.setsReps) {
        //                 if(set.weight > pr.maxWeight) {
        //                     set.isWeightPR = true
        //                 }
        //                 if(set.reps > pr.maxReps) {
        //                     set.isRepsPR = true
        //                 }
        //                 if(set.isWeightPR || set.isRepsPR) {
        //                     sendPRtoDash(userCollection, userId, item.name, set.setId, set.weight, set.reps, set.createdAt)
        //                 } else {
        //                     set.isWeightPR = false
        //                     set.isRepsPR = false
        //                 }
        //             }
        //         } 
        //         // else {
        //         //     console.log("doesn't match", item.id, pr.id)
                        
        //         // }
        //     }
        // }
        

// add or update sets and reps of current exercises
export async function addSetsReps( exerciseId, weight, reps, weightType, userCollection, userId) {
    try {
        // using exerciseId so it's easier to grab params later for use
        // const dateString = new Date().toISOString().split("T")[0]
        const selectedDate = localStorage.getItem("selectedDate")
        const date = new Date(selectedDate).toISOString().split("T")[0]
        
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

        await deleteDoc(dateOfWorkoutDocRef)

    } catch(e) {
        console.log("error deleting workout: ", e)
    }
}
