import styled from 'styled-components';
// BG Image
import bgImage from '../../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://i0.wp.com/matchpoint.nyc/wp-content/uploads/2015/08/tetris-background1.jpg?fit=1280%2C800&ssl=1") #000;
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
