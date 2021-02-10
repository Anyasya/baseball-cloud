import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';
import './style.css';
import RestorePasswordForm from '../../components/RestorePasswordForm';

function RestorePasswordPage() {
  return(
    <Container>
      <Header type='sign'/>
      <Main className='main'>
        <RestorePasswordForm />
      </Main>
      <Footer />
    </Container>
  );
}

export default RestorePasswordPage;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`