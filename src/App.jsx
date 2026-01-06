import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "./auth/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import { AuthProvider } from "./auth/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {

  return(
    <>
    <AuthProvider>
      <BrowserRouter>
      
      {/* Routes */}
      <Routes>

        <Route path="/login" element={ <Login/> }/>

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>

      </Routes>

      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App;