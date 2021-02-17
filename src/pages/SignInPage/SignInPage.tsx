import React, { useEffect } from 'react';
import SignInForm from '../../components/SignInForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';
import { selectors } from 'store';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from 'store';

function SignInPage() {
  const history = useHistory();
  const hasSignPassed = useSelector(selectors.auth.selectHasSignPassed);
  const accessData = localStorage.getItem('accessData');
  const dispatch = useDispatch();

  useEffect(() => { 
    if (hasSignPassed) {
      history.push('/profile');
    }

    if (accessData) {
      const parsedData = JSON.parse(accessData);
      dispatch(actions.auth.setAccessData(parsedData));
      history.push('/profile');
    } 
  }, [hasSignPassed, history, accessData, dispatch]);

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