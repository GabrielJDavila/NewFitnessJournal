
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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="WorkoutLog" element={<WorkoutLogLayout />}>
            <Route index element={<WorkoutLog />} />
            <Route path="AllCategories" element={<AllCategories />} />
            <Route path="AllCategories/:id" element={<LoadedExercises />}/>
            <Route path="ExerciseDetail/:id" element={<ExerciseDetail />} />
            <Route path="NewEx" element={<NewEx />} />
            <Route path="NewCat" element={<NewCat />} />
          </Route>
          {/* <Route path="WorkoutLog" element={<WorkoutLog />} />
          <Route path="AllCategories" element={<AllCategories />} />
          <Route path="AllCategories/:id" element={<LoadedExercises />}/>
          <Route path="ExerciseDetail/:id" element={<ExerciseDetail />} />
          <Route path="NewEx" element={<NewEx />} />
          <Route path="NewCat" element={<NewCat />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
