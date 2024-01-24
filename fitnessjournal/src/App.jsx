
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AllCategories from './pages/AllCategories'
import NewEx from './pages/NewEx'
import NewCat from './components/NewCat'
import LoadedExercises from './pages/LoadedExercises'
import ExerciseDetail from './pages/ExerciseDetail'
import TemplateWorkout from "./pages/TemplateWorkout"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ExerciseDetail/:id" element={<ExerciseDetail />} />
          <Route path="NewEx" element={<NewEx />} />
          <Route path="NewCat" element={<NewCat />} />
          <Route path="AllCategories" element={<AllCategories />} />
          <Route path="AllCategories/:id" element={<LoadedExercises />}/>
          <Route path="TemplateWorkout" element={<TemplateWorkout />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
