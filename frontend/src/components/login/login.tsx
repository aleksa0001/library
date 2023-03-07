import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "baseui/button";
import { Input } from "baseui/input";

function Login(props: any) {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const signIn = useSignIn();

  const onSubmit = async (values: any) => {
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        values
      );

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      if (response) {
        navigate("/");
      }
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
          <h1>{error}</h1>
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              type="email"
            />
            <Input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              type="password"
            />
    
            <Button  size="large" kind="primary" isLoading={formik.isSubmitting}>
              Login
            </Button>
         
        </form>
        <div>
       Don't have account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export { Login };
