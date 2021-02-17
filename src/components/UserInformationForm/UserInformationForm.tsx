import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Form as FinalForm, Field} from 'react-final-form';
import userImage from '../../assets/img/userIconBig.png';
import Select from 'react-select';
import {customSelectStyles} from './selectStyles';
import * as api from '../../api/api';

const positionOptions = [  
  { value: 'catcher', label: 'Catcher' },
  { value: 'firstBase', label: 'First Base' },
  { value: 'secondBase', label: 'Second Base' },
  { value: 'shortstop', label: 'Shortstop' },
  { value: 'thirdBase', label: 'Third Base' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

const handsOptions = [
  { value: "r", label: "R" },
  { value: "l", label: "L" },
];

const schoolYearsOptions = [
  { value: "freshman", label: "Freshman" },
  { value: "sophomore", label: "Sophomore" },
  { value: "junior", label: "Junior" },
  { value: "senior", label: "Senior" },
  { value: "none", label: "None" },
];

function UserInformationForm() {
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [facilitiesOptions, setFacilitiesOptions] = useState([]);

  useEffect(() => {
    api.getSchools().then((response) => {
      const schools = response.data.data.schools.schools.map((item: {id: string, name: string}) => {
        return {
          value: item.id, 
          label: item.name
        };
      });

      setSchoolOptions(schools);
    });

    api.getTeams().then((response) => {
      const teams = response.data.data.teams.teams.map((item: {id: string, name: string}) => {
        return {
          value: item.id,
          label: item.name
        };
      });

      setTeamOptions(teams);
    })

    api.getFacilities().then((response) => {
      const facilities = response.data.data.facilities.facilities.map((item: {id: string, u_name: string}) => {
        return {
          value: item.id,
          label: item.u_name
        };
      });

      setFacilitiesOptions(facilities);
    })
  }, []);

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
      <FinalForm onSubmit={onSubmit} render={(handleSubmit) => (
        <Form>
          <FormRow>
            <HalfWidthFieldWrapper>
              <Field name='firstName' type='text' render={({input}) => (
                <>
                  <TextInput {...input} type='text' id='firstName' placeholder='First Name*'/>
                  <Label htmlFor='firstName'>First Name*</Label>
                </>
              )}/>
            </HalfWidthFieldWrapper>
            <HalfWidthFieldWrapper>
              <Field name='lastName' render={({input}) => (
                <>
                  <TextInput {...input} type='text' id='lastName' placeholder='Last Name*'/>
                  <Label htmlFor='lastName'>Last Name*</Label>
                </>
              )}/>
            </HalfWidthFieldWrapper>
          </FormRow>
          <FullWidthFieldWrapper>
            <Field name='firstGamePosition' render={({input}) => (
              <SelectWrapper>
                <Select
                  options={positionOptions}
                  label='Position in Game*'
                  placeholder='Position in Game*'
                  styles={customSelectStyles}
                  onChange={(e) => input.onChange(e?.value)}
                />
              </SelectWrapper>
            )}/>
          </FullWidthFieldWrapper>
          <FullWidthFieldWrapper>
            <Field name='secondGamePosition' render={({input}) => (
              <SelectWrapper>
                <Select
                  options={[{value: "none", label: "-"}, ...positionOptions]}
                  label='Secondary Position in Game*'
                  placeholder='Secondary Position in Game*'
                  styles={customSelectStyles}
                  onChange={(e) => input.onChange(e?.value)}
                />
              </SelectWrapper>
            )}/>
          </FullWidthFieldWrapper>
          <CategoryHeader>Personal Info</CategoryHeader>
          <FullWidthFieldWrapper>
            <Field name='age' render={({input}) => (
              <>
                <TextInput {...input} type='text' id='age' placeholder='Age*'/>
                <Label htmlFor='age'>Age*</Label>
              </>
            )}/>
          </FullWidthFieldWrapper>
          <ZeroMarginRow>
            <HalfWidthFieldWrapper>
              <Field name='feet' render={({input}) => (
                  <>
                    <TextInput {...input} type='text' id='feet' placeholder='Feet*'/>
                    <Label htmlFor='feet'>Feet*</Label>
                  </>
                )}/>
            </HalfWidthFieldWrapper>
            <HalfWidthFieldWrapper>
              <Field name='inches' render={({input}) => (
                  <>
                    <TextInput {...input} type='text' id='inches' placeholder='Inches'/>
                    <Label htmlFor='inches'>Inches*</Label>
                  </>
                )}/>
            </HalfWidthFieldWrapper>
          </ZeroMarginRow>
          <Field name='weight' render={({input}) => (
            <FullWidthFieldWrapper>
              <TextInput {...input} type='text' id='weight' placeholder='Weight*'/>
              <Label htmlFor='weight'>Weight*</Label>
            </FullWidthFieldWrapper>
          )}/>
          <FormRow>
            <Field name='throws' render={({input}) => (
              <HalfWidthFieldWrapper>
                <SelectWrapper>
                  <Select
                    options={handsOptions}
                    label='Throws*'
                    placeholder='Throws*'
                    styles={customSelectStyles}
                    onChange={(e) => input.onChange(e?.value)}
                  />
                </SelectWrapper>
              </HalfWidthFieldWrapper>
            )}/>
            <Field name='bats' render={({input}) => (
              <HalfWidthFieldWrapper>
                <SelectWrapper>
                  <Select
                    options={handsOptions}
                    label='Bats*'
                    placeholder='Bats*'
                    styles={customSelectStyles}
                    onChange={(e) => input.onChange(e?.value)}
                  />
                </SelectWrapper>
              </HalfWidthFieldWrapper>
            )}/>
          </FormRow>
          <CategoryHeader>School</CategoryHeader>
          <FullWidthFieldWrapper>
            <Field name='school' render={({input}) => (
              <SelectWrapper>
                <Select
                  options={schoolOptions}
                  label='School'
                  placeholder='School'
                  styles={customSelectStyles}
                  onChange={(e) => input.onChange(e?.value)}
                />
              </SelectWrapper>
            )}/>
          </FullWidthFieldWrapper>
          <FullWidthFieldWrapper>
            <Field name='school' render={({input}) => (
              <SelectWrapper>
                <Select
                  options={schoolYearsOptions}
                  label='School Year'
                  placeholder='School Year'
                  styles={customSelectStyles}
                  onChange={(value) => input.onChange(value)}
                />
              </SelectWrapper>
            )}/>
          </FullWidthFieldWrapper>
          <FullWidthFieldWrapper>
            <Field name='teams' render={({input}) => (
              <SelectWrapper>
                <Select
                  options={teamOptions}
                  label='Team'
                  placeholder='Team'
                  styles={customSelectStyles}
                  isMulti={true}
                  onChange={(value) => input.onChange(value)}
                />
              </SelectWrapper>
            )}/>
          </FullWidthFieldWrapper>
          <CategoryHeader>Facility</CategoryHeader>
          <FullWidthFieldWrapper>
            <Field name='facility' render={({input}) => (
              <SelectWrapper>
                <Select
                  options={facilitiesOptions}
                  label='Facility'
                  placeholder='Facility'
                  styles={customSelectStyles}
                  isMulti={true}
                  onChange={(value) => input.onChange(value)}
                />
              </SelectWrapper>
            )}/>
          </FullWidthFieldWrapper>
          <CategoryHeader>About</CategoryHeader>
          <Field name='about' render={({input}) => (
            <FullWidthFieldWrapper>
              <Textarea {...input} id='about' placeholder='Describe yourself in a few words' />
              <Label htmlFor='about'>Describe yourself in a few words</Label>
            </FullWidthFieldWrapper>
          )}/>
          <FormRow>
            <CancelBtn type='button'>Cancel</CancelBtn>
            <SubmitBtn type='submit'>Save</SubmitBtn>
          </FormRow>
        </Form>
      )}/>
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
  margin-bottom: 12px;
  width: 100px;
  height: 100px;
  background-image: url(${userImage});
  background-size: cover;
`

const FileInputLabel = styled.label`
  margin-bottom: 23px;
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

const FormRow = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const ZeroMarginRow = styled(FormRow)`
  margin-bottom: 0;
`

const HalfWidthFieldWrapper = styled.div`
  width: 48%;
  position: relative;
`

const FullWidthFieldWrapper = styled.div`
  width: 100%;
  position: relative;
`

const TextInput = styled.input`
  margin-bottom: 10px;
  padding: 0 16px;
  width: 100%;
  height: 40px;
  color: #788b99;
  font-size: 14px;
  line-height: 18px;
  border-radius: 4px;
  background-color: #eff1f3;
  transition: all 0.2s;
  &::placeholder {
    color: #788b99;
  }
  &:focus {
    outline: none;
    background-color: #fff;
    border: solid 1px #48bbff;
    &::placeholder {
      color: white;
    }
  }
  &:focus + label { 
    transform: scale(0.7);
    top: 0;
    left: 6px;
    visibility: visible;
  }
`

const Textarea = styled.textarea`
margin-bottom: 10px;
padding: 16px;
width: 100%;
min-height: 110px;
color: #788b99;
font-size: 14px;
line-height: 18px;
border-radius: 4px;
background-color: #eff1f3;
resize: none;
transition: all 0.2s;
&::placeholder {
  color: #788b99;
}
&:focus {
  outline: none;
  background-color: #fff;
  border: solid 1px #48bbff;
  &::placeholder {
    color: white;
  }
}
&:focus + label {
  transform: scale(0.7) translate(-30px, 0px);
  top: 0;
  left: 6px;
  visibility: visible;
}
`

const Label = styled.label`
  max-width: 70%;
  cursor: text;
  color: #788b99;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  top: 10px;
  left: 17px;
  visibility: hidden;
  transform: scale(1.15);
  transition: all 0.2s;
  z-index: 10;
`

const SelectWrapper = styled.div`
  margin-bottom: 10px;
  &:focus, &:active {
    position: relative;
    z-index: 3;
  } 
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

const CancelBtn = styled.button`
  width: 48%;
  height: 38px;
  border-radius: 4px;
  text-align: center;
  border: solid 1px #d1d7db;
  &:hover {
    color: #48bbff;
    box-shadow: 0 0 4px 0 rgb(72 187 255 / 80%);
    border: solid 1px #48bbff;
  }
`

const SubmitBtn = styled(CancelBtn)`
  color: #fff;
  border: solid 1px transparent;
  background-color: #48bbff;
  &:hover {
    color: #fff;
  }
`