import React from 'react'
import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import LogOut from './LogOut'

const Screen = () => {
    const logOut = () => {
        window.localStorage.removeItem('jwt');
      }
    return (
        <>
            {/* <Container> */}
            <div className="styleScreen ">
                <div>
                    <div className="buttonScreen">
                        <Link to="/normal" className="styleButtonScreen">
                            Normal
                        </Link>
                    </div>
                    <div>
                        <Link to="/hard" className="styleButtonScreen">
                            Hard
                        </Link>
                    </div>
                    <div>
                        <Link to="/2player" className="styleButtonScreen">
                            2 Player
                        </Link>
                    </div>
                </div>
            </div >
            <LogOut callback={logOut} />
            {/* </Container> */}
        </>
    )
}

export default Screen;
