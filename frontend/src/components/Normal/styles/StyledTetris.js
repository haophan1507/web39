import styled from 'styled-components';
// BG Image
import bgImage from '../../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://wallup.net/wp-content/uploads/2017/03/27/425754-Tetris-cityscape-Columbia-video_games-digital_art-748x499.jpg") #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 205px;
    display: block;
    padding: 0 20px;
  }
`;
