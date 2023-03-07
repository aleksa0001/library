import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createBookApi } from "../api/BookApiClient";

function Book(props: any) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDesc] = useState("");
  const [genres, setGenres] = useState([]);
  const [dateOfCreation, setDateOfCreation] = useState([]);

  const onSubmit = async (values: any) => {
    const book = {
      title: values.title,
      image: values.image,
      description: values.description,
      genres: values.genres,
      dateOfCreation: values.dateOfCreation,
    };

    console.log(book);
    createBookApi(book)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  function validate(values: any) {}

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>
        <Formik
          initialValues={{ title, image, description, genres, dateOfCreation }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <fieldset className="form-group">
                <label>Title</label>
                <Field type="text" className="form-control" name="title" />
              </fieldset>
              <fieldset className="form-group">
                <label>Image</label>
                <Field type="text" className="form-control" name="image" />
              </fieldset>

              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Date of creation </label>
                <Field
                  type="date"
                  className="form-control"
                  name="dateOfCreation"
                />
              </fieldset>
              <div role="group" aria-labelledby="checkbox-group">
                <label>
                  <Field type="checkbox" name="genres" value="COMEDY" />
                  Comedy
                </label>
                <label>
                  <Field type="checkbox" name="genres" value="HORROR" />
                  Horror
                </label>
                <label>
                  <Field type="checkbox" name="genres" value="DOCUMENTARY" />
                  Documentary
                </label>
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

export { Book };
