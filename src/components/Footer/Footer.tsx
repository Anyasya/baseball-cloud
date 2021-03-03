import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

function Footer() {
  return (
    <Root>
      <LinkBar>
        <li>
          <CopyrightText>
            © 2018 BaseballCloud
          </CopyrightText>
        </li>
        <LinkItem>
          <Link to='/legal/terms'>
            Terms of Service
          </Link>
        </LinkItem>
        <LinkItem>
          <Link to='/legal/privacy'>
            Privacy Policy
          </Link>
        </LinkItem>
      </LinkBar>
      <LinkBar>
        <LinkItem>
          <a href='https://baseballcloud.blog/' target='_blank' rel="noreferrer">
            Blog
          </a>
        </LinkItem>
        <LinkItem>
          <a href='https://twitter.com/baseballcloudus' target='_blank' rel="noreferrer">
            Twitter
          </a>
        </LinkItem>
        <LinkItem>
          <a href='https://www.instagram.com/baseballcloudus/' target='_blank' rel="noreferrer">
            Instagram
          </a>
        </LinkItem>
        <LinkItem>
          <a href='https://www.facebook.com/BaseballCloudUS/' target='_blank' rel="noreferrer">
            Facebook
          </a>
        </LinkItem>
      </LinkBar>
    </Root>
  );
}

export default Footer;

const Root = styled.footer`
  padding: 10px 16px;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: white;
  border-top: 1px solid rgba(0,0,0,.1);
`

const LinkBar = styled.ul`
  display: flex;
`

const CopyrightText = styled.p`
  margin-right: 15px;
`

const LinkItem = styled.li`
  margin-right: 16px;
  color: #337ab7;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`