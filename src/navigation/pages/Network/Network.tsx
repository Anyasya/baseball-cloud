import React, {useState} from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Footer from 'components/Footer';
import {Form as FinalForm, Field, FormSpy} from 'react-final-form';
import TextFilterField from 'components/TextFilterField';
import SelectFilterField from 'components/SelectFilterField';
import SearchFilterField from 'components/SearchFilterField';
import FavoriteButton from 'components/FavoriteButton';
import Spinner from 'components/Spinner';
import * as api from 'api/api';

const positionOptions = [
  { value: '', label: 'All'},
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'shortstop', label: 'Shortstop' },
  { value: 'third_base', label: 'Third Base' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

const favoriteOptions = [
  {value: '', label: 'All'},
  {value: '1', label: 'Favorite'}
];

const countOptions = [
  {value: '10', label: '10'},
  {value: '15', label: '15'},
  {value: '25', label: '25'}
];

export interface FilterValues {
  profiles_count: number;
  offset: number;
  school?: string;
  team?: string;
  position?: string;
  age?: number;
  favorite?: number;
  player_name?: string;
}

export interface FavoriteValues {
  profile_id: string;
  favorite: boolean;
}

interface FormValues {
  school?: string;
  team?: string;
  position?: string;
  age?: number;
  favorite?: number;
  player_name?: string;
}

interface Profile {
  age: number;
  events: {id: string}[];
  favorite: boolean;
  feet: number;
  first_name: string;
  id: string;
  inches: number;
  last_name: string;
  position: string;
  position2: string;
  school: {id: string; name: string;};
  school_year: string;
  teams: {id: string; name: string}[];
  weight: number;
}

function Network() {
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [profilesCount, setProfilesCount] = useState(10);
  const [totalProfilesCount, setTotalProfilesCount] = useState(0);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  

  function onSubmit(values: FormValues) {
    setTimeout(() => setIsLoading(true), 100);
    api.getAllProfiles({...values, offset, profiles_count: profilesCount, age: Number(values.age), favorite: Number(values.favorite)}).then((response) => {
      const profiles = response.data.data.profiles;
      setTotalProfilesCount(profiles.total_count);
      setProfiles(profiles.profiles);
      setIsLoading(false);
    });
  }

  function changeProfileCountState(value: string | undefined) {
    setProfilesCount(Number(value));
  }

  function changeFavoriteProfile(id: string, favorite: boolean) {
    const changedProfiles = profiles.map(profile => {
      if (profile.id === id) {
        return {...profile, favorite};
      } else {
        return profile;
      }
    });

    setIsLoading(true);
    api.updateFavoriteProfile({profile_id: id, favorite}).then(() => {
      setIsLoading(false);
      setProfiles(changedProfiles);
    });
  }

  return (
    <Container>
      <Header/>
      <Main>
        <NetworkHeaderWrapper>
          <FinalForm onSubmit={onSubmit}>
            {({handleSubmit}) => (
              <>
                <HeaderRow>
                  <Heading>Network</Heading>
                  <FiltersContainer>
                    <FormSpy<FormValues>
                      subscription={{ values: true }}
                      onChange={() => setTimeout(handleSubmit, 100)}
                    />
                    <Field name='school' render={(props) => (
                      <TextFilterField label='School' {...props}/>
                    )}/>
                    <Field name='team' render={(props) => (
                      <TextFilterField label='Team' {...props}/>
                    )}/>
                    <Field name='position' render={(props) => (
                      <SelectFilterField options={positionOptions} label='Position' {...props}/>
                    )}/>
                    <Field name='age' render={(props) => (
                      <TextFilterField label='Age' {...props}/>
                    )}/>
                    <Field name='favorite' render={(props) => (
                      <SelectFilterField options={favoriteOptions} label='Favorite' {...props}/>
                    )}/>
                    <Field name='profiles_count' render={(props) => (
                      <SelectFilterField options={countOptions} onChange={changeProfileCountState} label='Count' {...props}/>
                    )}/>
                  </FiltersContainer>
                </HeaderRow>
                <HeaderRow>
                  <PlayersCounter>Available Players ({totalProfilesCount})</PlayersCounter>
                  <Field name='player_name' render={(props) => (
                    <SearchFilterField label='Search' {...props}/>
                  )}/>
                </HeaderRow>
              </>
            )}
          </FinalForm>
        </NetworkHeaderWrapper>
        <ContentWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <ColumnHeader>Player Name</ColumnHeader>
                <ColumnHeader>Sessions</ColumnHeader>
                <ColumnHeader>School</ColumnHeader>
                <ColumnHeader>Teams</ColumnHeader>
                <ColumnHeader>Age</ColumnHeader>
                <ColumnHeader>Favorite</ColumnHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {profiles.length > 0 && 
                profiles?.map((profile) => {
                  return (
                    <TableBodyRow key={profile.id}>
                      <TableData>{profile.first_name} {profile.last_name}</TableData>
                      <TableData>{profile.events.length > 0 ? profile.events.map(event => event.id).join(', ') : '-'}</TableData>
                      <TableData>{profile.school ? profile.school.name : '-'}</TableData>
                      <TableData>{profile.teams.length > 0 ? profile.teams.map(team => team.name).join(', ') : '-'}</TableData>
                      <TableData>{profile.age ? profile.age : '-'}</TableData>
                      <TableData>
                        <FavoriteButton favorite={profile.favorite} id={profile.id} onClick={changeFavoriteProfile}/>
                      </TableData>
                    </TableBodyRow>
                  );
                })
              }
            </tbody>
          </Table>
          {profiles.length === 0 && <EmptyContentBox>There's no info yet!</EmptyContentBox>}
          {isLoading && <Spinner/>}
        </ContentWrapper>
      </Main>
      <Footer />
    </Container>
  );
}

export default Network;

const Container = styled.div`
  height: 100vh;
  min-width: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  background-color: #fff;
`

const NetworkHeaderWrapper = styled.div`
  padding: 16px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Heading = styled.h2`
  font-size: 24px;
  line-height: 1.25;
  color: #667784;
  font-weight: 400;
`

const FiltersContainer = styled.div`
  display: flex;
`

const HeaderRow = styled.div`
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const PlayersCounter = styled.p`
  line-height: 1.25;
  font-size: 18px;
  color: #414f5a;
`

const ContentWrapper = styled.div`
  position: relative;
  padding: 16px;
`

const Table = styled.table`
  width: 100%;
`

const TableRow = styled.tr`
  margin-bottom: 6px;
  min-height: 44px;
  display: flex;
  justify-content: space-between;
`

const TableHead = styled.thead`
  position: sticky;
  top: 0;
`

const TableBodyRow = styled(TableRow)`
  align-items: center;
  border-radius: 4px;
  background-color: #f7f8f9;
`

const ColumnHeader = styled.th`
  font-size: 14px;
  line-height: 1;
  font-weight: 300;
  color: #667784;
  text-overflow: ellipsis;
  flex-grow: 1;
  text-align: left;
  &:first-child {
    width: 19.5%;
  }
  &:nth-child(2) {
    width: 10%;
  }
  &:nth-child(3) {
    width: 23%;
  }
  &:nth-child(4) {
    width: 23%;
  }
  &:nth-child(5) {
    width: 15%;
  }
  &:last-child {
    width: 8%;
  }
`

const TableData = styled.td`
  font-size: 14px;
  color: #414f5a;
  flex-grow: 1;
  &:first-child {
    width: 19.5%;
  }
  &:nth-child(2) {
    width: 10%;
  }
  &:nth-child(3) {
    width: 23%;
  }
  &:nth-child(4) {
    width: 23%;
  }
  &:nth-child(5) {
    width: 15%;
  }
  &:last-child {
    width: 8%;
  }
`

const EmptyContentBox = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  color: #667784;
  font-size: 16px;
`