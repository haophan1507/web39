import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

const StyledStartButton = styled.button`
  box-sizing: border-box;
  padding: 10px;
  min-height: 30px;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 15px;
  outline: none;
  cursor: pointer;
  position: fixed;
  width : 80px;
  top:10px;
  right:10px;
`;

const LogOut = ({ callback, username }) => (
  <div>
    <h2 style={{
      top:'15px', 
      right:'100px',
      position:'fixed',
      color: 'white',
      fontSize : '20px'}}>{username}</h2>
    <a href=""><StyledStartButton onClick={callback}><FontAwesomeIcon icon={faSignOutAlt} /></StyledStartButton></a>
  </div>
);

export default LogOut;
