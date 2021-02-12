import React from 'react';
import styled from 'styled-components';
import {Form as FinalForm, Field} from 'react-final-form';
import userImage from '../../assets/img/userIconBig.png';

function UserInformationForm() {
  function onSubmit() {
    return;
  }

  return (
    <Container>
      <Form>
        <UserIcon/>
        <FileInputLabel>Choose Photo
          <FileInput type='file'/>
        </FileInputLabel>
      </Form>
      {/* <FinalForm onSubmit={onSubmit} render={(handleSubmit) => (
        <Form>
          <div>
            <Field name='firstName' render={({input}) => (
              <>
                <input {...input} type='text' id='firstName'/>
                <label htmlFor='firstName'/>
              </>
            )}/>
            <Field name='lastName' render={({input}) => (
              <>
                <input {...input} type='text' id='lastName'/>
                <label htmlFor='lastName'/>
              </>
            )}/>
          </div>
        </Form>
      )}/> */}
    </Container>
  );
}

export default UserInformationForm;

const Container = styled.div`
  width: 250px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserIcon = styled.div`
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
  background-image: url(${userImage});
  background-size: cover;
`

const FileInputLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: #788b99;
  cursor: pointer;
  &:hover {
    color: #48bbff;
    text-decoration: underline;
  }
`

const FileInput = styled.input`
  display: none;
`

const TextInput = styled.input`

`
