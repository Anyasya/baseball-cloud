import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import bgImage from 'assets/img/authBg.png';
import SignUpForm from '../../../components/SignUpForm';
import styled from 'styled-components';

function SignUpPage() {
  return (
    <Container>
      <Header/>
      <Main>
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
  background-image: url(${bgImage});
  background-position: top center;
  background-size: cover;
`