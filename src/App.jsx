import { Routes, Route } from "react-router-dom"

import Header from "./components/Header";
import Home from "./components/Home";
import Articles from "./components/Articles";


const App = ()=>{
return(
  <div>
    <Header />
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/articles/:article_id" element={<Articles />}/>
    </Routes>

  </div>
)
}

export default App;