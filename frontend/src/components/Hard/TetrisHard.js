import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import { createStage, checkCollision } from '../../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../../hooks/hooksHard/useInterval';
import { usePlayer } from '../../hooks/hooksHard/usePlayer';
import { useStage } from '../../hooks/hooksHard/useStage';
import { useGameStatus } from '../../hooks/hooksHard/useGameStatus';
import { AuthUserCtx } from '../../context/authUser'

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import LogOut from '../LogOut'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [users, setUsers] = useState([]);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  const { authUser, setAuthUser } = useContext(AuthUserCtx);


  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(200 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(200);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const logOut = () => {
    window.localStorage.removeItem('jwt');
  }

  const point = (points, myPoints) => {
    if (points > myPoints) {
      axios.put('http://10.1.8.250:5000/auth/points', { username: authUser.username, points: points })
        .then((res) => {
          setAuthUser(res.data);
        })
    }
  }

  function compare(a, b) {
    if (a.points < b.points) {
      return 1;
    }
    if (a.points > b.points) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    axios.get("http://10.1.8.250:5000/auth/getUsers").then((res) => {
      res.data.sort(compare)
      setUsers(res.data)
      console.log(res.data)

    })
  }, [authUser.points])


  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 500) {
      setLevel(prev => prev + 5);
      // Also increase speed
      setDropTime(200 / (level + 1) + 500);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
        point(score, authUser.points);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) { //left
        movePlayer(-1);
      } else if (keyCode === 39) { //right
        movePlayer(1);
      } else if (keyCode === 40) { //down
        dropPlayer();
      } else if (keyCode === 38) { //up
        playerRotate(stage, 1);
      }
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <ul className="listRank" >
          {
            users.slice(0, 10).map((user, index) => <li key={index}>
              {user.username} : {user.points} </li>)
          }
        </ul>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </div>
            )}
          <StartButton callback={startGame} />
          <Link to="/" className="buttonHomeScreen">
            Back to Home</Link>
        </aside>
      </StyledTetris>
      <LogOut username={authUser.username} callback={logOut} />
    </StyledTetrisWrapper>
  );
};

export default Tetris;
