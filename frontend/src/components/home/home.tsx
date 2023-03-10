import { Button } from "baseui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBooksApi } from "../api/BookApiClient";
import { getAllWrittersApi } from "../api/WritterApiClient";

function Home() {
  const [books, setBook] = useState([]);
  const [writters, setWritters] = useState([]);

  const first4Books = books.slice(0, 4);

  useEffect(() => {
    refreshBooks();
    refreshWritters();
  }, []);

  function refreshBooks() {
    getAllBooksApi()
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }
  function refreshWritters() {
    getAllWrittersApi()
      .then((res) => {
        setWritters(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <h1 className="m-5">Books</h1>
      <div className="row mx-md-n5">
        {first4Books.map((book: any) => (
          <div key={book.id} className="card col m-2">
            <h3 className="h3 text-center">{book.title}</h3>
            <img className="image" id="image" src={book.image} alt="" />
            <p className="lead m-2">{book.description}</p>
          </div>
        ))}
      </div>
      <div className="btn">
        <Button kind="secondary">
          <Link className="nav-link" to="/all-books">
            See all books...
          </Link>
        </Button>
      </div>
      <h1 className="m-5">Writters</h1>
      <div className="row">
        {writters.map((writter: any) => (
          <div key={writter.id} className="card m-2 col-md-3 m-1">
            <h3 className="h3 lead m-4 text-center">
              {writter.fullName} - {writter.birthday}
            </h3>
            <img className="image m-1" id="image" src={writter.image} alt="" />
          </div>
        ))}
      </div>
      <div className="btn">
        <Button kind="secondary">See all writters...</Button>
      </div>
    </div>
  );
}

export { Home };
