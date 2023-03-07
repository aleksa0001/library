import { Button } from "baseui/button";
import { useEffect, useState } from "react";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { getAllBooks } from "../api/BookApiClient";

function Home() {
  const singOut = useSignOut();
  const navigate = useNavigate();
  const [books, setBook] = useState([]);

  const logout = () => {
    singOut();
    navigate("/login");
  };

  useEffect(() => refreshTodos(), []);

  function refreshTodos() {
    getAllBooks()
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }

  function addNewBook() {
    navigate("/book");
  }
  function addNewWritter() {
    navigate("/writter");
  }
  return (
    <div className="container">
      <h1>Welcome Home Bud!</h1>
      <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
      <Button kind="primary" onClick={addNewBook}>
        Add new book
      </Button>
      <Button kind="secondary" onClick={addNewWritter}>
        Add new writter
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: any) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Home };
