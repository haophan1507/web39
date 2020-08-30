import React from 'react';
import { Container, Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from 'yup'
const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(6, "Username's length must be greater than 6")
        .required("Username is required"),
    password: yup
        .string()
        .min(6, "Password's length must be greater than 6!")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], "Confirm password not matched")
        .required("Confirm password is required!")
})
export const Register = () => {
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    })

    const { handleSubmit, handleChange, handleBlur, touched, errors, values } = formik;
    console.log(values);

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>Register</Card.Header>
                <Card.Body>
                    <Card.Title>Please fill out the form to create an account...</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUser" >
                            <Form.Label>UserName</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter username"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={errors.username && touched.username}
                            />
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                placeholder="Password" 
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={errors.password && touched.password} />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={errors.confirmPassword && touched.confirmPassword} />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
