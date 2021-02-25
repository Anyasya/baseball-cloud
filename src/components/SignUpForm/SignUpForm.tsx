import React, { useState } from 'react';
import styled from 'styled-components';
import {Form as FinalForm, Field} from 'react-final-form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faLock, faCheck} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import ConfirmIcon from '../Icons/ConfirmIcon';
import { useDispatch } from 'react-redux';
import { actions } from 'store';

interface SignUpFormValues {
  email: string;
  password: string;
  password_confirmation: string;
}

function SignUpForm() {
  const dispatch = useDispatch();
  const [userCategory, setUserCategory] = useState('player');

  function onSubmit(values: SignUpFormValues) {
    const {email, password, password_confirmation} = values;
    dispatch(actions.auth.signUp({email, password, password_confirmation, role: userCategory}));
  }

  return (
    <FinalForm
      onSubmit={onSubmit}
      render={({handleSubmit}) => (
      <Form onSubmit={handleSubmit}>
        {userCategory === 'player' ? 
          <CategoryBtnsWrapper>
            <ActiveCategoryBtn type='button' onClick={() => setUserCategory('player')}>
              <ButtonIcon>
                <ConfirmIcon />
              </ButtonIcon>
              Sign Up as Player
            </ActiveCategoryBtn>
            <CurrentCategoryBtn type='button' onClick={() => setUserCategory('scout')}>
              Sign Up as Scout
            </CurrentCategoryBtn>
          </CategoryBtnsWrapper>
          :
          <CategoryBtnsWrapper>
            <CurrentCategoryBtn type='button' onClick={() => setUserCategory('player')}>
              Sign Up as Player
            </CurrentCategoryBtn>
            <ActiveCategoryBtn type='button' onClick={() => setUserCategory('scout')}>
              <ButtonIcon>
                <ConfirmIcon />
              </ButtonIcon>
              Sign Up as Scout
            </ActiveCategoryBtn>
          </CategoryBtnsWrapper>
        }
        <MainHeader>{userCategory === 'player' ? 'Players' : 'Scouts'}</MainHeader>
        <SecondaryHeader>{userCategory === 'player' ? 
          'Players have their own profile within the system and plan on having data collected.' 
          :
          'Coaches and scouts can view players in the system but do not have their own profile.'}
        </SecondaryHeader>
        <Field name='email' render={({input}) => (
            <InputField>
              <Icon aria-hidden='true'>
                <FontAwesomeIcon icon={faUser}/>
              </Icon>
              <Label htmlFor='email'>Email</Label>
              <Input {...input} type="email" placeholder="Email" id='email'/>
            </InputField>
        )} />
        <Field name='password' render={({input}) => (
            <InputField>
              <Icon aria-hidden='true'>
                <FontAwesomeIcon icon={faLock}/>
              </Icon>
              <Label htmlFor='password'>Password</Label>
              <Input {...input} type="password" placeholder="Password" id='password'/>
            </InputField>
        )} />
        <Field name='password_confirmation' render={({input}) => (
            <LastInputField>
              <Icon aria-hidden='true'>
                <FontAwesomeIcon icon={faCheck}/>
              </Icon>
              <Label htmlFor='confirmPassword'>Confirm password</Label>
              <Input {...input} type="password" placeholder="Confirm Password" id='confirmPassword'/>
            </LastInputField>
        )} />
        <Button type='submit'>Sign Up</Button>
        <WarningMessage>
          By clicking Sign Up, you agree to our{' '}
          <WarningLink to={'/legal/terms'}>Terms of Service</WarningLink>{' '}
          and{' '}
          <WarningLink to={'/legal/privacy'}>Privacy Policy</WarningLink>.
        </WarningMessage>
        <SignLinkText>Already registered?
          <SignLink to={'signIn'}>Sign In</SignLink>
        </SignLinkText>
      </Form>
    )} />
  );
}

export default SignUpForm;

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

const CategoryBtnsWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  font-weight: 700;
  line-height: 1.13;

  button {
    padding-top: 15px;
    padding-bottom: 17px;
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      order-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`

const CurrentCategoryBtn = styled.button`
  width: 50%;
  color: #35c32a;
  text-align: center;
  border: solid 1px #35c32a;
  background-color: #ffffff;
  &:hover {
    color: #ffffff;
    border: solid 1px #35c32a;
    background-color: #35c32a;
  }
`

const ActiveCategoryBtn = styled.button`
  width: 50%;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  border: solid 1px #35c32a;
  background-color: #35c32a;
`
const ButtonIcon = styled.span`
  margin-right: 5px;
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

const LastInputField = styled(InputField)`
  margin-bottom: 20px;
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

const WarningMessage = styled.p`
  margin-bottom: 8px;
  padding: 0 10px;
  font-size: 16px;
`

const WarningLink = styled(Link)`
  color: #337ab7;
  text-decoration: none;
  &:hover {
    color: #23527c;
    text-decoration: underline;
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