import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Footer from 'components/Footer';
import UserInformationForm from 'components/UserInformationForm';
import UserInformationBlock from 'components/UserInformationBlock';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import * as api from 'api/api';
import Spinner from 'components/Spinner';

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

enum Tab {
  BATTING = 'batting',
  REPORTS = 'reports',
  COMPARISON = 'comparison',
}

function ProfilePage() {
  const user = useSelector(selectors.auth.selectUser);
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [hasProfileEditingOpened, setHasProfileEditingOpened] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(Tab.BATTING);

  useEffect(() => {
    if (user.id) {
      setIsLoading(true);
      api.getCurrentProfile(user.id.toString()).then((response) => {
        if (response.data.data.profile.first_name) {
          const profile = response.data.data.profile;
          setCurrentUser(profile);
          dispatch(actions.auth.setProfileInfo({avatar: profile.avatar, firstName: profile.first_name, lastName: profile.last_name}));
        } else {
          setHasProfileEditingOpened(true);
        }

        setIsLoading(false);
      });
    }
  }, [user.id, dispatch]);

  function openUserInfoForm() {
    setHasProfileEditingOpened(true);
  }

  function hideUserInfoForm() {
    setHasProfileEditingOpened(false);
  }

  function onUpdateProfile(values: ValuesProps, imageUrl: string| undefined) {
    const preparedValues = {
      age: +values.age, 
      avatar: imageUrl,
      bats_hand: values.bats_hand,
      biography: values.biography,
      facilities: values.facilities,
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

    // @ts-ignore
    api.updateProfile(preparedValues).then((response) => {
      setCurrentUser(response.data.data.update_profile.profile);
      hideUserInfoForm();
    });
  }

  return (
    <Container>
      <Header/>
      <Main>
        {isLoading ? (
          <Spinner />
            ) : (
          <>
            <UserBlock>
              {hasProfileEditingOpened ? (
                <UserInformationForm currentUser={currentUser} hideUserInfoForm={hideUserInfoForm} onSubmit={onUpdateProfile}/>
              ) : (
                <UserInformationBlock currentUser={currentUser} openUserInfoForm={openUserInfoForm}/>
              )}
            </UserBlock>
            <AccountBlock>
              <Wrapper>
                <Block>
                  <BlockHeader>Top Batting Values</BlockHeader>
                  <FlexContainer>
                    <BattingCategoryWrapper>
                      <BattingCategoryHeader>
                        <BattingCategory>Exit Velocity</BattingCategory>
                        <BattingValue>N/A</BattingValue>
                      </BattingCategoryHeader>
                      <ProgressBar></ProgressBar>
                    </BattingCategoryWrapper>
                    <BattingCategoryWrapper>
                      <BattingCategoryHeader>
                        <BattingCategory>Carry Distance</BattingCategory>
                        <BattingValue>N/A</BattingValue>
                      </BattingCategoryHeader>
                      <ProgressBar></ProgressBar>
                    </BattingCategoryWrapper>
                    <BattingCategoryWrapper>
                      <BattingCategoryHeader>
                        <BattingCategory>Launch Angle</BattingCategory>
                        <BattingValue>N/A</BattingValue>
                      </BattingCategoryHeader>
                      <ProgressBar></ProgressBar>
                    </BattingCategoryWrapper>
                  </FlexContainer>
                </Block>
                <Block>
                  <BlockHeader>Recent Session Reports</BlockHeader>
                  <BlockText>No data currently linked to this profile</BlockText>
                </Block>
              </Wrapper>
              <Block>
                <TabList>
                  <TabItem>
                    <ChangeBtn $isActive={activeTab === Tab.BATTING} onClick={() => setActiveTab(Tab.BATTING)}>Batting</ChangeBtn>
                    <BattingOptions>
                      <li>
                        <BattingOptionBtn>Summary</BattingOptionBtn>
                      </li>
                      <li>
                        <BattingOptionBtn>Charts</BattingOptionBtn>
                      </li>
                      <li>
                        <BattingOptionBtn>Log</BattingOptionBtn>
                      </li>
                    </BattingOptions>
                  </TabItem>
                  <TabItem>
                    <ChangeBtn $isActive={activeTab === Tab.REPORTS} onClick={() => setActiveTab(Tab.REPORTS)}>Session Reports</ChangeBtn>
                  </TabItem>
                  <TabItem>
                    <ChangeBtn $isActive={activeTab === Tab.COMPARISON} onClick={() => setActiveTab(Tab.COMPARISON)}>Сomparison</ChangeBtn>
                  </TabItem>
                </TabList>
              </Block>
            </AccountBlock>
          </>
        )}
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
  position: relative;
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
  padding: 16px;
  flex-grow: 1;
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Block = styled.div`
  margin-bottom: 32px;
  padding: 16px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  flex-grow: 1;
  box-sizing: border-box;
  @media(min-width: 1660px) {
    flex-wrap: nowrap;
    width: auto;
    &:first-child {
      margin-right: 32px;
      flex-grow: 20;
    }
    &:nth-child(2) {
      flex-grow: 1;
    }
  }
`

const BlockHeader = styled.h2`
  margin-bottom: 16px;
  line-height: 1.25;
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: stretch;
  flex-grow: 1;
`

const BattingCategoryWrapper = styled.div`
  max-width: 324px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
  &:not(:last-child) {
    margin-right: 24px;
  }
`

const BattingCategoryHeader = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`

const BattingCategory = styled.p`
  font-size: 16px;
  color: #667784;
`

const BattingValue = styled.p`
  font-size: 16px;
  color: #667784;
  font-weight: 700;
`

const ProgressBar = styled.div`
  max-width: 100%;
  height: 4px;
  background-color: #eff1f3;
`

const BlockText = styled.p`
  color: #667784;
  font-size: 16px;
`

const TabList = styled.ul`
  display: flex;
  list-style: none;
`

const TabItem = styled.li`
  margin: 8px;
  position: relative;
  &:hover ul {
    display: block;
  }
  &::after {
    content: '';
    position: absolute;
    height: 3px;
    left: 0;
    right: 0;
    bottom: -3px;
  }
`

const ChangeBtn = styled.button<{$isActive?: boolean}>`
  padding: 8px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  ${({ $isActive }) => $isActive
    ? `color: #fff;
      background-color: #788b99;` 
    : `color: #667784; `
  }
  border: 2px solid #788b99;
  border-radius: 40px;
  &:hover {
    color: #788b99;
    background: rgba(120,139,153,.4);
  }
`

const BattingOptions = styled.ul`
  padding: 8px 0;
  min-width: 178px;
  display: none;
  list-style: none;
  position: absolute;
  left: 0;
  top: 40px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
`

const BattingOptionBtn = styled.button`
  padding: 8px 16px;
  width: 100%;
  text-align: left;
  color: #788b99;
  &:hover {
    background-color: rgba(72, 187, 255, 0.1);
  }
`