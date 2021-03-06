import React, { useState } from "react";
import { Nav, Form, Button, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Username's length must be greater than 6!")
    .max(10, "Username's length must be less than 10!")
    .required("Username is required!"),
  password: yup
    .string()
    .min(6, "Password's length must be greater than 6!")
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Confirm password not matched")
    .required("Confirm password is required!"),
});

export const Register = () => {
  const [registering, setRegistering] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setRegistering(true);
      axios
        .post("http://10.1.8.250:5000/auth/register", {
          username: values.username,
          password: values.password,
          points : 0,
        })
        .then(() => {
          setSuccess(true);
          setError(false);
        })
        .catch(() => {
          setError(true);
          setSuccess(false);
        })
        .finally(() => {
          setRegistering(false);
        });
    },
  });

  const { handleSubmit, handleChange, handleBlur, touched, errors } = formik;

  return (
    <div className="page-wrapper bg-gra-01 p-t-100 p-b-100 font-poppins">
      <div className="card card-3 wrapper wrapper--w780">
        <div className="card-heading"></div>
        <div class="card-body">
            {!registering && isSuccess ? (
              <Alert variant="success">Registered Successfully!</Alert>
            ) : null}
            {!registering && isError ? (
              <Alert variant="danger">Something went wrong!</Alert>
            ) : null}
            <h2 className="title">Register Info</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Enter username"
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
              <Form.Group controlId="formConfirmPassword" className="input-group">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.confirmPassword && errors.confirmPassword}
                  className="input input--style-3"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={registering} className="btn btn--pill btn-danger">
                {registering ? "Registering ..." : "Register"}
              </Button>
              <Nav.Link as={Link} to="/auth/login" className="link">
                Already have an account ? Login
              </Nav.Link>
            </Form>
        </div>
      </div>
    </div>
  );
};
