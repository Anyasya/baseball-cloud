import React from 'react';
import styled from 'styled-components';
import {Form as FinalForm, Field} from 'react-final-form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

interface RestorePasswordFormValues {
  email: string;
  password: string;
}

function RestorePasswordForm() {
  function onSubmit(values: RestorePasswordFormValues) {
    
  }

  return (
    <FinalForm
      onSubmit={onSubmit}
      render={({handleSubmit}) => (
      <Form onSubmit={handleSubmit}>
        <MainHeader>Forgot Password</MainHeader>
        <SecondaryHeader>Please enter your email address. You will receive a link to reset your password via email.</SecondaryHeader>
        <Field name='email' render={({input}) => (
            <InputField>
              <Icon aria-hidden='true'>
                <FontAwesomeIcon icon={faUser}/>
              </Icon>
              <Label>Email</Label>
              <Input {...input} type="email" placeholder="Email" />
            </InputField>
        )} />
        <Button type='submit'>Submit</Button>
        <SignLinkText>Remember password
          <SignLink to={'/login'}>Sign in</SignLink>
        </SignLinkText>
      </Form>
    )} />
  );
}

export default RestorePasswordForm;

const Form = styled.form`
  padding: 16px;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  background: hsla(0,0%,100%,.8);
  backdrop-filter: blur(5px);
`

const MainHeader = styled.h1`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: #667784;
  margin-bottom: 8px;
`

const SecondaryHeader = styled.h2`
  margin-bottom: 48px;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: #667784;
  font-size: 16px;
`

const InputField = styled.div`
  margin-bottom: 15px;
  position: relative;
`

const Icon = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
`

const Label = styled.label`
  font-size: 0;
`

const Input = styled.input`
  padding: 14px 12px 14px 37px;
  width: 100%;
  border-radius: 4px;
  background-color: #eff1f3;
  border: 1px solid transparent;
  &:focus {
    background-color: white;
    border: 1px solid #48bbff;
  } 
`

const Button = styled.button`
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 17px;
  color: #ffffff;
  font-weight: 400;
  border: solid 1px transparent;
  background-color: #48bbff;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  &:hover {
    box-shadow: 0 0 4px 0 rgb(72 187 255 / 80%);
  }
  &:active {
    box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 25%);
  }
`

const SignLinkText = styled.p`
  color: #667784;
  text-align: center;
`

const SignLink = styled(Link)`
  padding-left: 3px;
  color: #48bbff;
  text-decoration: underline;
`