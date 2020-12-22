import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthUserCtx } from '../../context/authUser';
// import Tetris from '../../components/Tetris'
import TetrisHard from "../../components/Hard/TetrisHard"
import Tetris2Player from "../../components/Tetris2player"
import Tetris from "../../components/Normal/Tetris"
import Screen from "../../components/Screen"
import { Link, Route, Switch} from "react-router-dom"



export const Home = () => {
    const fetchMeApiData = useAuth();
    const { authUser } = useContext(AuthUserCtx);

    if (fetchMeApiData.loading) {
        return <div>Authenticating ...</div>
    }

    if (fetchMeApiData.error) {
        return <Redirect to="auth/login" />
    }
    if (!authUser) {
        return null;
    }

    return (
        <>
        <Switch>
        
        <Route exact path="/" component={Screen} />
        <Route exact path="/normal" component={Tetris} />
        <Route exact path="/hard" component={TetrisHard} />
        <Route exact path="/2player" component={Tetris2Player} />
        </Switch>
        </>
        // <Tetris />
    )
}
