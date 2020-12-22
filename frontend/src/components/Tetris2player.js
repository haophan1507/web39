import React, { useState } from 'react';
import { Link } from "react-router-dom"

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/hooksNomal/useInterval';
import { usePlayer } from '../hooks/hooksNomal/usePlayer';
import { useStage } from '../hooks/hooksNomal/useStage';
import { useGameStatus } from '../hooks/hooksNomal/useGameStatus';

// Components
import Stage from './Normal/Stage';
import Display from './Normal/Display';
import StartButton from './Normal/StartButton';
import LogOut from './LogOut'

const Tetris2Player = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
        rowsCleared
    );


    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const keyUp = ({ keyCode }) => {
        if (!gameOver && !gameOver2) {
            // Activate the interval again when user releases down arrow.
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1));
            }
            else if (keyCode === 83) {
                setDropTime2(1000 / (level + 1));
            }
        }
    };

    const logOut = () => {
        window.localStorage.removeItem('jwt');
    }   

    const startGame = () => {
        // Reset everything
        setStage(createStage());
        setDropTime(500);
        resetPlayer();
        setScore(0);
        setLevel(0);
        setRows(0);
        setGameOver(false);

        setStage2(createStage());
        setDropTime2(500);
        resetPlayer2();
        setScore2(0);
        setLevel2(0);
        setRows2(0);
        setGameOver2(false);
    };

    const drop = () => {
        // Increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            // Also increase speed
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            // Game over!
            if (player.pos.y < 1) {
                console.log('GAME OVER!!!');
                setGameOver(true);
                setDropTime(null);
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
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    };

    const [dropTime2, setDropTime2] = useState(null);
    const [gameOver2, setGameOver2] = useState(false);

    const [player2, updatePlayerPos2, resetPlayer2, playerRotate2] = usePlayer();
    const [stage2, setStage2, rowsCleared2] = useStage(player2, resetPlayer2);
    const [score2, setScore2, rows2, setRows2, level2, setLevel2] = useGameStatus(
        rowsCleared2
    );


    const movePlayer2 = dir => {
        if (!checkCollision(player2, stage2, { x: dir, y: 0 })) {
            updatePlayerPos2({ x: dir, y: 0 });
        }
    };

    const keyUp2 = ({ keyCode }) => {
        if (!gameOver2) {

        }
    };

    const startGame2 = () => {
        // Reset everything

    };

    const drop2 = () => {
        // Increase level when player has cleared 10 rows
        if (rows2 > (level2 + 1) * 10) {
            setLevel2(prev => prev + 1);
            // Also increase speed
            setDropTime2(1000 / (level2 + 1) + 200);
        }

        if (!checkCollision(player2, stage2, { x: 0, y: 1 })) {
            updatePlayerPos2({ x: 0, y: 1, collided: false });
        } else {
            // Game over!
            if (player2.pos.y < 1) {
                console.log('GAME OVER!!!');
                setGameOver2(true);
                setDropTime2(null);
            }
            updatePlayerPos2({ x: 0, y: 0, collided: true });
        }
    };

    const dropPlayer2 = () => {
        // We don't need to run the interval when we use the arrow down to
        // move the tetromino downwards. So deactivate it for now.
        setDropTime2(null);
        drop2();
    };

    // This one starts the game
    // Custom hook by Dan Abramov
    useInterval(() => {
        drop2();
    }, dropTime2);

    const move2 = ({ keyCode }) => {
        if (!gameOver2) {
            if (keyCode === 65) {
                movePlayer2(-1);
            } else if (keyCode === 68) {
                movePlayer2(1);
            } else if (keyCode === 83) {
                dropPlayer2();
            } else if (keyCode === 87) {
                playerRotate2(stage2, 1);
            }
        }
    };


    return (
        <StyledTetrisWrapper
            role="button"
            tabIndex="0"
            onKeyDown={e => { move(e); move2(e) }}
            onKeyUp={keyUp}
        >
            <StyledTetris>
                <div style={{ position: 'fixed', top: '50px', left: '80px' }}>
                    <Display text={'Player 1'} />
                    <Display text={`Score: ${score}`} />
                    <Display text={`rows: ${rows}`} />
                    <Display text={`Level: ${level}`} />
                </div>
                <Stage stage={stage2} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Player 1 Win" />
                    ) : null}
                    {
                        gameOver2 ? (
                            <Display gameOver={gameOver2} text="Player 2 Win" />
                        ) : null
                    }

                    <StartButton callback={startGame} />
                    <Link to="/" className="buttonHomeScreen" style={{
                        display: "block"
                    }}>
                        Back to Home</Link>
                </aside>
                <Stage stage={stage} />
                <div style={{ position: 'fixed', top: '50px', left: '1075px' }}>
                    <Display text={'Player 2'} />
                    <Display text={`Score: ${score2}`} />
                    <Display text={`rows: ${rows2}`} />
                    <Display text={`Level: ${level2}`} />
                </div>

            </StyledTetris>
            <LogOut callback={logOut} />
        </StyledTetrisWrapper>
    );
};

export default Tetris2Player;
