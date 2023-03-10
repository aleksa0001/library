import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { createWritterApi } from "../api/WritterApiClient";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getAllBooksApi } from "../api/BookApiClient";

function Writter(props: any) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, sortable: false },
    { field: "title", headerName: "Title", width: 130 },
    { field: "image", headerName: "Image", width: 130 },
    { field: "dateOfCreation", headerName: "Date of creation", width: 130 },
  ];

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [fullName, setFullname] = useState("");
  const [image, setImage] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => refreshBooks(), []);

  function refreshBooks() {
    getAllBooksApi()
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }

  const onSubmit = async (values: any) => {
    const writter = {
      fullName: values.fullName,
      image: values.image,
      birthday: values.birthday,
      books: selectedRows,
    };

    console.log(writter);
    createWritterApi(writter)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  function validate(values: any) {
    // todo validation
  }

  return (
    <div className="writters">
      <div className="container">
        <h1>Create new writter ✍️</h1>
        <div>
          <Formik
            initialValues={{ fullName, birthday, image, books }}
            enableReinitialize={true}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {(props) => (
              <Form>
                <fieldset className="form-group">
                  <label>Full name</label>
                  <Field type="text" className="form-control" name="fullName" />
                </fieldset>
                <fieldset className="form-group">
                  <label>Birth date </label>
                  <Field type="date" className="form-control" name="birthday" />
                </fieldset>
                <fieldset className="form-group">
                  <label>Image</label>
                  <Field type="text" className="form-control" name="image" />
                </fieldset>
                <div style={{ height: 400, width: "100%" }}>
                  <h2 className="header">Select books for writter</h2>
                  <DataGrid
                    rows={books}
                    columns={columns}
                    checkboxSelection
                    onRowSelectionModelChange={(ids: any) => {
                      const selectedIDs = new Set(ids);
                      const selectedRows = books.filter((row: any) =>
                        selectedIDs.has(row.id)
                      );
                      console.log(selectedRows);
                      setSelectedRows(selectedRows);
                    }}
                  />
                </div>
                <div className="">
                  <button className="btn btn-success m-5" type="submit">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export { Writter };
