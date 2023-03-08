import { Button } from "baseui/button";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Header(props: any) {
  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate("/login");
  };

  function addNewBook() {
    navigate("/book");
  }

  function addNewWritter() {
    navigate("/writter");
  }

  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <Button kind="secondary" onClick={addNewBook}>
          Add new book
        </Button>
        <Button kind="secondary" onClick={addNewWritter}>
          Add new writter
        </Button>
        <Button className="float-right" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}

export { Header };
