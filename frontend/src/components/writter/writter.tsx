import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createWritterApi } from "../api/WritterApiClient";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getAllBooks } from "../api/BookApiClient";
import React from "react";

function Writter(props: any) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, sortable: false },
    { field: "title", headerName: "Title", width: 130 },
    { field: "image", headerName: "Image", width: 130 },
    { field: "dateOfCreation", headerName: "Date of creation", width: 130 },
  ];

//   const rows = [
//     { books.id , title: books.title },
//     { id: 2, title: "Lannister" },
//   ];

  const navigate = useNavigate();

  const [books, setBooks] = useState([])
  const [fullName, setFullname] = useState("");
  const [image, setImage] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedRows, setSelectedRows] = React.useState([]);

  useEffect(() => refreshTodos(), []);

  function refreshTodos() {
    getAllBooks()
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }
  const onSubmit = async (values: any) => {
    const book = {
      fullName: values.fullName,
      image: values.image,
      birthday: values.birthday,
      books: values.selectedRows
    };

    console.log(book);
    createWritterApi(book)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  function validate(values: any) {}

  return (
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
                <DataGrid
                  rows={books}
                  columns={columns}
                  // pageSize={5}
                  // rowsPerPageOptions={[5]}
                  checkboxSelection
                // **************  ovaj ispod valja
                // onRowSelectionModelChange={(ids : any) => {
                //     const selectedIDs = new Set(ids);
                //     const selectedRows = books.filter((row : any) =>
                //       selectedIDs.has(row.id),
                //     );
                //     console.log(selectedRows)
                //     setSelectedRows(selectedRows);
                //   }}
            
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
  );
}

export { Writter };
