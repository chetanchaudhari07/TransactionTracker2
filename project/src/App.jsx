import { BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import{Home as HomeIcon } from "lucide-react";
import DashBoard from "./pages/DashBoard";
import  Login  from "./pages/Login";
import Signup from "./pages/Signup";


function App() {
  
  return(
   
   <Router>
    
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 mr-2" />
              <h1 className="text-2xl font-bold">FinanceTracker</h1>
            </div>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
   </Router>

  )
}

export default App;