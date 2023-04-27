import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Vcr } from "./pages/Vcr/Vcr";
import { VcrNew } from "./pages/Vcr/VcrNew";
import logo from "./logo.svg";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vcr" element={<Vcr />} />
      <Route path="/vcr_new" element={<VcrNew />} />
    </Routes>
  );
}

export default App;
