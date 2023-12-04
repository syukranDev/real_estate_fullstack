import "./App.css";
import Layout from "./components/Layout/Layout";
import Websites from "./pages/Websites";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Suspense } from "react";
import Properties from "./pages/Properties/Properties";

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Websites />}/>
          <Route path="/properties" element={<Properties />}/>
        </Route>
      </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
