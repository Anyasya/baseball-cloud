import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SignUpForm from '../../components/SignUpForm';
import styled from 'styled-components';
import './style.css';

function SignUpPage() {
  return (
    <Container>
      <Header type='sign'/>
      <Main className='main'>
        <SignUpForm />
      </Main>
      <Footer />
    </Container>
  );
}

export default SignUpPage;

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