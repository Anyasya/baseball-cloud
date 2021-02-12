import React from 'react';
import styled from 'styled-components';
import './style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserInformationForm from '../../components/UserInformationForm';

function MainPage() {
  return (
    <Container>
      <Header type='main'/>
      <Main>
        <UserBlock>
          <UserInformationForm />
        </UserBlock>
        <AccountBlock>
          123
        </AccountBlock>      
      </Main>
      <Footer />
    </Container>
  );
}

export default MainPage;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-grow: 1;
  background-color: #788b99;
`

const UserBlock = styled.div`
  padding: 16px;
  background-color: white;
  overflow: auto;
`

const AccountBlock = styled.div`
  flex-grow: 1;
  
`