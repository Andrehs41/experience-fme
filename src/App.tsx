import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Barrio from "./pages/Barrio";
import Colecciones from "./pages/Colecciones";
import Footer from "./components/Footer";
import Comunidad from "./pages/Comunidad";
import Multimarca from "./pages/Multimarca";
import Showcase from "./pages/Showcase";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <>
              <Home />
              <Footer variant="home" />
            </>
          } />
          <Route path="/colecciones" element={
            <>
              <Colecciones />
              <Footer variant="colecciones" />
            </>
          } />

          <Route path="/barrio" element={
            <>
              <Barrio />
              <Footer variant="barrio" />
            </>
          } />
          <Route path="/comunidad" element={
            <>
              <Comunidad />
              <Footer variant="comunidad" />
            </>
          } />
          <Route path="/multimarca" element={
            <>
              <Multimarca />
              <Footer variant="multimarca" />
            </>
          } />
          <Route path="/showcase" element={
            <>
              <Showcase />
              <Footer variant="colecciones" />
            </>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}