import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../Logo';

interface HeaderProps {
  type: string;
}

function Header({type}: HeaderProps) {
  return (
    <Root>
      {type === 'sign' && <Link to={'/login'}><Logo /></Link>}
    </Root>
  );
}

export default Header;

const Root = styled.header`
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid rgba(0,0,0,.1);
`;