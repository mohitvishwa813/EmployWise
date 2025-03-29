import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
