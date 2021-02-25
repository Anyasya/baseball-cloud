import React from 'react';
import styled from 'styled-components';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

function Spinner() {
  return (
    <LoaderWrapper>
      <Loader type='BallTriangle' color='#00BFFF' height={80} width={80}/>
    </LoaderWrapper>
  );
}

export default Spinner;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
`