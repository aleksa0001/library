import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerUserApi } from "./api/TodoApiService";

function RegisterComponent() {
  const navigate = useNavigate();
  function onSubmit(values) {
    const user = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    };

    registerUserApi(user)
      .then((response) => {
        navigate("/home");
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="container">
      <h1>Register 💻</h1>
      <div className=""> 
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          }}
          onSubmit={onSubmit}
          // validate={validate}
          // validateOnChange={false}
          // validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <fieldset className="form-group">
                <label>First name</label>
                <Field type="text" className="form-control" name="firstname" />
              </fieldset>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Last name </label>
                <Field type="text" className="form-control" name="lastname" />
              </fieldset>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Email </label>
                <Field type="email" className="form-control" name="email" />
              </fieldset>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Password </label>
                <Field type="text" className="form-control" name="password" />
              </fieldset>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <div className="">
                <button className="btn btn-success m-5" type="submit">
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterComponent;
