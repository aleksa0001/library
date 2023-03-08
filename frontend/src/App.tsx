import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login";
import { Home } from "./components/home/home";
import { RequireAuth, useIsAuthenticated } from "react-auth-kit";
import { Register } from "./components/register/register";
import { Book } from "./components/book/book";
import { Writter } from "./components/writter/writter";
import { Header } from "./components/header/header";

function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="">
      {isAuthenticated() && <Header></Header>}

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
        <Route
          path="/book"
          element={
            <RequireAuth loginPath="/login">
              <Book />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/writter"
          element={
            <RequireAuth loginPath="/login">
              <Writter />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
