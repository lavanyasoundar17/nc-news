import { Routes, Route } from "react-router-dom"

import Header from "./components/Header";
import Home from "./components/Home";

const App = ()=>{
return(
  <div>
    <Header />
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>

  </div>
)
}

export default App;