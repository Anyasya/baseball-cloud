import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

function MainPage() {
  return (
    <Container>
      <Header/>
      <Main>
        123     
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
  overflow-y: scroll;
  background-color: #788b99;
`