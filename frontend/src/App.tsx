import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login";
import { Home } from "./components/home/home";
import { RequireAuth, useIsAuthenticated } from "react-auth-kit";
import { Book } from "./components/book/book";
import { Writter } from "./components/writter/writter";
import { Header } from "./components/header/header";
import { Books } from "./components/books/books";

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
        <Route
          path="/book"
          element={
            <RequireAuth loginPath="/login">
              <Book />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/all-books"
          element={
            <RequireAuth loginPath="/login">
              <Books />
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
