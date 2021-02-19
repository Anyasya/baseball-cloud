import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styled from 'styled-components';
import bgImage from 'assets/img/authBg.png';
import RestorePasswordForm from '../../../components/RestorePasswordForm';

function RestorePasswordPage() {
  return(
    <Container>
      <Header/>
      <Main>
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
  background-image: url(${bgImage});
  background-position: top center;
  background-size: cover;
`