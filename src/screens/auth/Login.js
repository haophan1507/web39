import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from 'yup'
const validationSchema = yup.object().shape({
    username:yup
    .string()
    .min(6,"Username's length must be greater than 6")
    .required("Username is required"),
    password:yup
    .string()
    .min(6,"Password's length must be greater than 6!")
    .required("Password is required"),
})
export const Login = () => {
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    })

    const { handleSubmit,handleChange, handleBlur, touched ,errors } = formik;
    console.log(touched);    

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>Login</Card.Header>
                <Card.Body>
                    <Card.Title>Signing in ...</Card.Title>
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
                            placeholder="Password" n
                            ame="password" 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            isInvalid={errors.password && touched.password}/>
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
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