import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login";
import { Home } from "./components/home/home";
import { RequireAuth } from "react-auth-kit";
import { Register } from "./components/register/register";
import { Book } from "./components/book/book";
import { Writter } from "./components/writter/writter";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/book" element={<Book />}></Route>
        <Route path="/writter" element={<Writter />}></Route>
      </Routes>
    </div>
  );
}

export default App;
