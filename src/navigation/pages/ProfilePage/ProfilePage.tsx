import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Footer from 'components/Footer';
import UserInformationForm from 'components/UserInformationForm';
import UserInformationBlock from 'components/UserInformationBlock';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import * as api from 'api/api';
import Spinner from 'components/Loader';

export interface CurrentUser {
  age: number;
  avatar: string;
  bats_hand: string;
  biography: string;
  facilities: {id: string, email: string, u_name: string}[];
  feet: number;
  first_name: string;
  id: string;
  inches: number;
  last_name: string;
  position: string;
  position2: string;
  school: {id: string, name: string};
  school_year: string;
  teams: {id: string, name: string}[];
  throws_hand: string;
  weight: number;
};

interface ValuesProps {
  age: string;
  bats_hand: string;
  biography?: string;
  facilities?: {value: {id: string, email: string, u_name:string}, label: string}[];
  feet: string;
  first_name: string;
  inches?: string;
  last_name: string;
  position: string;
  position2?: string;
  school?: {id: string, name: string}[];
  school_year?: string;
  teams?: {value: string, label: string}[];
  throws_hand: string;
  weight: string;
}

function ProfilePage() {
  const user = useSelector(selectors.auth.selectUser);
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [hasProfileEditingOpened, setHasProfileEditingOpened] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      api.getCurrentProfile(user.id.toString()).then((response) => {
        if (response.data.data.profile.first_name) {
          const profile = response.data.data.profile;
          setCurrentUser(profile);
          dispatch(actions.auth.setProfileInfo({avatar: profile.avatar, firstName: profile.first_name, lastName: profile.last_name}));
        } else {
          setHasProfileEditingOpened(true);
        }
      });
    }
  }, [user.id, dispatch]);

  function openUserInfoForm() {
    setHasProfileEditingOpened(true);
  }

  function hideUserInfoForm() {
    setHasProfileEditingOpened(false);
  }

  function onUpdateProfile(values: ValuesProps, imageUrl: string) {
    const preparedValues = {
      age: +values.age, 
      avatar: imageUrl,
      bats_hand: values.bats_hand,
      biography: values.biography,
      facilities: values.facilities?.map(item => item.value),
      feet: +values.feet, 
      first_name: values.first_name,
      id: user.id!.toString(),
      inches: values.inches ? +values.inches : undefined, 
      last_name: values.last_name,
      position: values.position,
      position2: values.position2,
      school: values.school,
      school_year: values.school_year,
      teams: values.teams,
      throws_hand: values.throws_hand,
      weight: +values.weight,
    };

    //@ts-ignore
    api.updateProfile(preparedValues).then((response) => {
      setCurrentUser(response.data.data.update_profile.profile);
      hideUserInfoForm();
    });
  }

  return (
    <Container>
      <Header/>
      <Main>
        <UserBlock>
          {hasProfileEditingOpened ? (
            <UserInformationForm currentUser={currentUser} hideUserInfoForm={hideUserInfoForm} onSubmit={onUpdateProfile}/>
          ) : (
            <UserInformationBlock currentUser={currentUser} openUserInfoForm={openUserInfoForm}/>
          )}
        </UserBlock>
        <AccountBlock>
          123
        </AccountBlock>      
      </Main>
      <Footer />
    </Container>
  );
}

export default ProfilePage;

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

const UserBlock = styled.div`
  padding: 16px;
  background-color: white;
  overflow: auto;
`

const AccountBlock = styled.div`
  flex-grow: 1;
`