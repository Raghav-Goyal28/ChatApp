import { Route, Routes,Navigate } from "react-router-dom"
import Signup from "./components/Signup"
import Left from "./home/rightpart/leftpart/Left"
import Right from "./home/rightpart/rightpat/right"
import { useAuth } from "./context/AuthProvider"
import Login from "./components/Login"
import { Toaster } from "react-hot-toast";

function App() {
  const [authUser,setAuthUser]=useAuth();
  return (
   <>
    <Routes>
      <Route path="/" element={authUser ? ( <div className="flex h-screen">
      <Left/>
      <Right/>
     
    </div>
      ):(
        <Navigate to="/login" />
      )
    }/>
   <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
