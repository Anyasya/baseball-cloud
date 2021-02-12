import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../Logo';
import {AppRoutes} from 'routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ArrowDown from 'components/ArrowDown';

interface HeaderProps {
  type: string;
}

function Header({type}: HeaderProps) {
  const [hasProfileBtnClicked, setHasProfileBtnClicked] = useState(false);

  return (
    <Root>
      {type === 'sign' && <Link to={AppRoutes.signIn}><Logo /></Link>}
      {type === 'main' && 
      <>
        <Link to={AppRoutes.signIn}>
          <Logo />
        </Link>
        <Navigation>
          <Link to={AppRoutes.leaderBoard}>
            <LinkText>Leaderboard</LinkText>
          </Link>
          <Link to={AppRoutes.network}>
            <LinkText>Network</LinkText>
          </Link>
          <Link to={AppRoutes.profile}>
            <ProfileIconWrapper>
              <FontAwesomeIcon icon={faUser}/>
            </ProfileIconWrapper>
          </Link>
          <Button type='button' onClick={() => setHasProfileBtnClicked((prev) => !prev)}>
            Profile name
            <ArrowIconWrapper>
              <ArrowDown/>
            </ArrowIconWrapper>
          </Button>
          {hasProfileBtnClicked && 
            <ProfileLinksWrapper>
              <Link to={AppRoutes.profile}>
                <ProfileLinkText>My Profile</ProfileLinkText>
              </Link>
              <Link to={AppRoutes.signIn}>
                <ProfileLinkText>Log Out</ProfileLinkText>
              </Link>
            </ProfileLinksWrapper>
          }
        </Navigation>
      </>}
    </Root>
  );
}

export default Header;

const Root = styled.header`
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid rgba(0,0,0,.1);
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
`

const ProfileIconWrapper = styled.div`
  margin: 0 10px;
  padding: 5px 9px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #d1d7db;
  box-sizing: border-box;
`

const LinkText = styled.p`
  padding: 0 8px;
  color: #788b99;
  text-decoration: none;
  position: relative;
  &:hover {
    &::before {
      border-bottom: 4px solid #788b99;
      content: "";
      display: block;
      left: 0;
      right: 0;
      position: absolute;
      bottom: -16px;
    }
  }
`
const Button = styled.button`
  padding: 7px 18px 10px;
  color: #788b99;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  &:hover {
    background-color: #eee;
  }
`

const ArrowIconWrapper = styled.div`
  margin-left: 5px;
`

const ProfileLinksWrapper = styled.div`
  padding: 8px 0;
  min-width: 178px;
  position: absolute;
  right: -5px;
  top: 55px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  &::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -8px;
    right: 25px;
    z-index: 2;
    border-style: solid;
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent #ffffff transparent;
  }
`

const ProfileLinkText = styled.p`
  padding: 8px 16px;
  color: #788b99;
  &:hover {
    background-color: rgba(72, 187, 255, 0.1);
  }
`