import React, { useContext, useState } from "react";
import { Form, Button, Nav, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

import { AuthUserCtx } from "../../context/authUser";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Username's length must be greater than 6!")
    .required("Username is required!"),
  password: yup
    .string()
    .min(6, "Password's length must be greater than 6!")
    .required("Password is required!"),
});

export const Login = () => {
  const [login, setLogin] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const { setAuthUser } = useContext(AuthUserCtx);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLogin(true);
      axios
        .post("http://10.1.8.250:5000/auth/login", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          setAuthUser(res.data.user);
          localStorage.setItem("jwt", res.data.jwt);
          setSuccess(true);
          setError(false);
        })
        .catch(() => {
          setError(true);
          setSuccess(false);
        })
        .finally(() => {
          setLogin(false);
        });
    },
  });

  const { handleSubmit, handleBlur, handleChange, errors, touched } = formik;

  return (
    <div className="page-wrapper bg-gra-01 p-t-100 p-b-100 font-poppins">
      <div className="card card-3 wrapper wrapper--w780">
        <div className="card-heading"></div>
        <div class="card-body">
            {!login && isSuccess ? (
              <Alert variant="success">Registered Successfully!</Alert>
            ) : null}
            {!login && isError ? (
              <Alert variant="danger">Something went wrong!</Alert>
            ) : null}
          <h2 className="title">Login Info</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="input-group">
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && errors.username}
                className="input input--style-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword" className="input-group">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && errors.password}
                className="input input--style-3"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="btn btn--pill btn-danger">
              Login
            </Button>
            <Nav.Link as={Link} to="/auth/register" className="link">
              Not yet have an account ? Register
          </Nav.Link>
          </Form>
        </div>
      </div>
    </div>
  );
};
