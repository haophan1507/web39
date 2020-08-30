import React from "react";
import { Navbar,Nav,Container } from "react-bootstrap";
import {Route,Link} from "react-router-dom";
import {Login} from "./Login"
import {Register} from "./Register"

export const Auth = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                <Navbar.Brand>The Social</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" class="ml-auto">
                    <Nav>
                        <Nav.Link as={Link} to="/auth/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/auth/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                <Route path="/auth/login" component={Login}/>
                <Route path="/auth/register" component={Register}/>
            </div>
        </div>
    )
}