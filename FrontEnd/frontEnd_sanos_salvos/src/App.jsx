import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import RegistrarMascota from "./pages/RegistrarMascota"
import ProtectedRoute from "./components/ProteccionRuta"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/registrar"
          element={
            <ProtectedRoute>
              <RegistrarMascota />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
