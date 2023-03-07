import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import { Formik, Form, Field, ErrorMessage } from "formik";

function LoginComponent() {
    const navigate = useNavigate();

    const authContenxt = useAuth();

    async function handleSubmit(values) {
       if(await authContenxt.login(values.email, values.password)) {
        let email = values.email
        navigate(`/home/${email}`);
       }
    }

    return (
      <div className="container">
        <h1>Login 💻</h1>
        <div className=""> 
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            // validate={validate}
            // validateOnChange={false}
            // validateOnBlur={false}
          >
            {(props) => (
              <Form>
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
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
}

export default LoginComponent