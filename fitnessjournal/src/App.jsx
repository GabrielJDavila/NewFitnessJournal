
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AllCategories from './pages/AllCategories'
import NewEx from './pages/NewEx'
import NewCat from './components/NewCat'
import LoadedExercises from './pages/LoadedExercises'
import ExerciseDetail from './pages/ExerciseDetail'
import WorkoutLog from "./pages/WorkoutLog"
import WorkoutLogLayout from "./components/WorkoutLogLayout"
import ProfileCreation from "./pages/ProfileCreation"
import Settings from "./pages/Settings"
import UserProfile from "./pages/UserProfile"

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />

            <Route path="Settings" element={<Settings />}>
              <Route path="UserProfile" element={<UserProfile />} />
            </Route>
            <Route path="profilecreation" element={<ProfileCreation />}/>
            <Route path="WorkoutLog" element={<WorkoutLogLayout />}>
              <Route index element={<WorkoutLog />} />
              <Route path="AllCategories" element={<AllCategories />} />
              <Route path="AllCategories/:id" element={<LoadedExercises />}/>
              <Route path="ExerciseDetail/:id" element={<ExerciseDetail />} />
            </Route>
            
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
