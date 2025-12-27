import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio" element={<ProtectedRoute> <Portfolio /> </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
