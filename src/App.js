import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from "./component/NavBar";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Edit from "./component/Edit";
import Details from "./component/Details";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
