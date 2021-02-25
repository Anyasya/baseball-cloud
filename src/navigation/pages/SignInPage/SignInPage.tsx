import React from 'react';
import SignInForm from '../../../components/SignInForm';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styled from 'styled-components';
import bgImage from 'assets/img/authBg.png';
import {selectors} from 'store';
import { useSelector } from 'react-redux';
import Spinner from 'components/Loader';

function SignInPage() {
  const isSignInLoading = useSelector(selectors.auth.selectIsSignInLoading);

  return (
    <Container>
      <Header/>
      <Main>
        <SignInForm />
      </Main>
      <Footer/>
      {isSignInLoading && <Spinner/>}
    </Container>
  );
}

export default SignInPage;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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