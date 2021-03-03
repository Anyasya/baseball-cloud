import React from 'react';
import styled from 'styled-components';
import {CurrentUser} from 'navigation/pages/ProfilePage';
import AgeIcon from 'components/Icons/AgeIcon';
import HeightIcon from 'components/Icons/HeightIcon';
import WeightIcon from 'components/Icons/WeightIcon';
import ThrowsIcon from 'components/Icons/ThrowsIcon';
import BatsIcon from 'components/Icons/BatsIcon';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import userIcon from 'assets/img/userIconBig.png';
import SchoolInfoItem from 'components/SchoolInfoItem';

interface UserInformationBlockProps {
  currentUser?: CurrentUser;
  openUserInfoForm: () => void;
}

function UserInformationBlock({currentUser, openUserInfoForm}: UserInformationBlockProps) {
  return (
    <Container>
      <UserInfoWrapper>
        <UserImage src={currentUser?.avatar ? currentUser?.avatar : userIcon} alt={`User photo - ${currentUser?.first_name} ${currentUser?.last_name}`}/>
        <UserName>{`${currentUser?.first_name} ${currentUser?.last_name}`}</UserName>
        <FirstPosition>
          {currentUser?.position.split('_').map((item) => item.charAt(0).toUpperCase() + item.slice(1)).join(' ')}
        </FirstPosition>
        {currentUser?.position2 && 
          <SecondPosition>
            {currentUser?.position2.split('_').map((item) => item.charAt(0).toUpperCase() + item.slice(1)).join(' ')}
          </SecondPosition>}
        <EditBtn type='button' onClick={() => openUserInfoForm()}>
          <FontAwesomeIcon icon={faPen}/>
        </EditBtn>
      </UserInfoWrapper>
      <ul>
        <PersonalInfoItem>
          <InfoIcon>
            <AgeIcon/>
          </InfoIcon>
          <PersonalInfoCategory>Age</PersonalInfoCategory>
          <PersonalInfoValue>{currentUser?.age}</PersonalInfoValue>
        </PersonalInfoItem>
        <PersonalInfoItem>
          <InfoIcon>
            <HeightIcon/>
          </InfoIcon>
          <PersonalInfoCategory>Height</PersonalInfoCategory>
          <PersonalInfoValue>{currentUser?.feet} ft {currentUser?.inches ? currentUser?.inches+' in' : null}</PersonalInfoValue>
        </PersonalInfoItem>
        <PersonalInfoItem>
          <InfoIcon>
            <WeightIcon/>
          </InfoIcon>
          <PersonalInfoCategory>Weight</PersonalInfoCategory>
          <PersonalInfoValue>{currentUser?.weight} lbs</PersonalInfoValue>
        </PersonalInfoItem>
        <PersonalInfoItem>
          <InfoIcon>
            <ThrowsIcon/>
          </InfoIcon>
          <PersonalInfoCategory>Throws</PersonalInfoCategory>
          <PersonalInfoValue>{currentUser?.throws_hand.toUpperCase()}</PersonalInfoValue>
        </PersonalInfoItem>
        <PersonalInfoItem>
          <InfoIcon>
            <BatsIcon/>
          </InfoIcon>
          <PersonalInfoCategory>Bats</PersonalInfoCategory>
          <PersonalInfoValue>{currentUser?.bats_hand.toUpperCase()}</PersonalInfoValue>
        </PersonalInfoItem>
      </ul>
      <ul>
        {currentUser?.school && 
          <SchoolInfoItem category={'School'} content={currentUser?.school.name}/>
        }
        {currentUser?.school_year && 
          <SchoolInfoItem category={'School Year'} content={currentUser?.school_year}/>
        }
        {currentUser?.teams && 
          <SchoolInfoItem category={'Team'} content={currentUser?.teams.map(team => team.name)}/>
        }
        {currentUser?.facilities && 
          <SchoolInfoItem category={'Facility'} content={currentUser?.facilities.map(team => team.u_name)}/>
        }
        {currentUser?.biography && 
          <li>
            <CategoryHeader>About</CategoryHeader>
            <InfoText>{currentUser?.biography}</InfoText>
          </li>
        }
      </ul>
    </Container>
  );
}

export default UserInformationBlock;

const Container = styled.div`
  width: 264px;
`

const UserInfoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserImage = styled.img`
  margin-bottom: 6px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

const UserName = styled.p`
  font-size: 20px;
  line-height: 24px;
  color: #414f5a;
  word-wrap: break-word;
  word-break: break-all;
  text-align: center;
`

const FirstPosition = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: #788b99;
  border-bottom: 1px solid #cbcccd;
`

const SecondPosition = styled(FirstPosition)`
  border: none;
`

const EditBtn = styled.button`
  width: 35px;
  height: 35px;
  color: white;
  background-color: #48BBFF;
  border-radius: 50%;
  position: absolute;
  top: 12px;
  right: 13px;
`

const PersonalInfoItem = styled.li`
  padding: 16px 0;
  display: flex;
`

const InfoIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`

const PersonalInfoCategory = styled.p`
  flex-grow: 1;
`

const PersonalInfoValue = styled.p`
`

const InfoText = styled.p`
  font-size: 16px;
  color: #667784;
  margin-bottom: 11px;
`

const CategoryHeader = styled.p`
  margin-top: 10px;
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justity-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
  &::after {
    margin-left: 12px;
    content: '';
    height: 1px;
    background-color: #e7ebef;
    flex-grow: 1;
  }
`