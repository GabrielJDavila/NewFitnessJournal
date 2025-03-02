
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
import SettingsLayout from "./components/SettingsLayout"
import Settings from "./pages/Settings"
import UserProfile from "./pages/UserProfile"
import NutritionLayout from "./components/NutritionLayout"
import NutritionLog from "./pages/NutritionLog"
import SearchAllFoods from "./pages/SearchAllFoods"
import FoodDetail from "./pages/FoodDetail"
import ComingSoon from "./pages/ComingSoon"
import ScrollToTop from "./components/ScrollToTop"
import Analysis from "./pages/Analysis"
import ExDetailedViewLayout from "./components/ExDetailedViewLayout"
import ExDetailedView from "./pages/ExDetailedView"
import ExDetailedHistory from "./pages/ExDetailedHistory"
import ProgramIntake from "./pages/ProgramIntake"

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="ProgramIntake" element={<ProgramIntake />} />
            <Route path="Settings" element={<SettingsLayout />}>
              <Route index element={<Settings />} />
              <Route path="UserProfile" element={<UserProfile />} />
            </Route>
            {/* <Route path="profilecreation" element={<ProfileCreation />}/> */}
            <Route path="WorkoutLog" element={<WorkoutLogLayout />}>
              <Route index element={<WorkoutLog />} />
              {/* create a layout for ExDetailedView, so that I can switch between pages: Detailed View, History, and PRs */}
              <Route path="ExDetailedView/:id" element={<ExDetailedViewLayout />}>
                <Route index element={<ExDetailedView />}/>
                <Route path="ExDetailedHistory" element={<ExDetailedHistory/>}/>
              </Route>
              
              <Route path="AllCategories" element={<AllCategories />} />
              <Route path="AllCategories/:id" element={<LoadedExercises />}/>
              <Route path="ExerciseDetail/:id" element={<ExerciseDetail />} />
            </Route>

            <Route path="Analysis" element={<Analysis/>}/>
            <Route path="ComingSoon" element={<ComingSoon />}/>
            {/* <Route path="NutritionLog" element={<NutritionLayout/>}>
              <Route index element={<NutritionLog />} />
              <Route path="SearchAllFoods" element={<SearchAllFoods />} />
              <Route path="SearchAllFoods/:id" element={<FoodDetail />} />
            </Route> */}
            
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
