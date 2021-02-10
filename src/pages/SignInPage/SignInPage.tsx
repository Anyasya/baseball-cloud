import React from 'react';
import SignInForm from '../../components/SignInForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';
import './style.css';

function SignInPage() {
  return (
    <Container>
      <Header type='sign'/>
      <Main className='main'>
        <SignInForm />
      </Main>
      <Footer />
    </Container>
  );
}

export default SignInPage;

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