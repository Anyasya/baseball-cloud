import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Form as FinalForm, Field} from 'react-final-form';
import userImage from '../../assets/img/userIconBig.png';
import Select from 'react-select';
import {customSelectStyles} from './selectStyles';
import * as api from '../../api/api';
import {CurrentUser} from 'navigation/pages/ProfilePage';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';


const positionOptions = [
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'shortstop', label: 'Shortstop' },
  { value: 'third_base', label: 'Third Base' },
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

export interface FormProps {
  age: number;
  avatar?: string | undefined;
  bats_hand: string;
  biography?: string;
  facilities?: {id: string, email: string, u_name:string}[];
  feet: number;
  first_name: string;
  id: string;
  inches?: number | undefined;
  last_name: string;
  position: string;
  position2?: string;
  school?: {id: string, name: string}[];
  school_year?: string;
  teams?: {id: string, name: string}[];
  throws_hand: string;
  weight: number;
}

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

interface UserInformationFormProps {
  currentUser?: CurrentUser;
  hideUserInfoForm: () => void;
  onSubmit: (values: ValuesProps, imageUrl: string | undefined) => void;
}
interface SelectOption {
  value: string;
  label: string;
}

interface FacilitiesSelectOption {
  value: {
    id: string;
    email: string;
    u_name: string;
  };
  label: string;
}

function UserInformationForm({currentUser, hideUserInfoForm, onSubmit}: UserInformationFormProps) {
  const [hasImageChoosed, setHasImageChoosed] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(currentUser?.avatar || null);
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);
  const [imageName, setImageName] = useState<string | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>(currentUser?.avatar);
  const [schoolOptions, setSchoolOptions] = useState<SelectOption[]>([]);
  const [teamOptions, setTeamOptions] = useState<SelectOption[]>([]);
  const [facilitiesOptions, setFacilitiesOptions] = useState<FacilitiesSelectOption[]>([]);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [isFormUploading, setIsFormUploading] = useState(false);

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
      const facilities = response.data.data.facilities.facilities.map((item: {id: string, email: string, u_name: string}) => {
        return {
          value: {id: item.id, email: item.email, u_name: item.u_name},
          label: item.u_name
        };
      });

      setFacilitiesOptions(facilities);
    })
  }, []);

  function convertBase64(file: File) {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setHasImageChoosed(true);
    const file = e.target.files![0];
    const blob = new Blob([file], { type: file.type });
    setAvatarBlob(blob);

    if (file) {
      setImageName(file.name);
      const base64 = await convertBase64(file);
    
      if (typeof base64 === 'string') {
        setPreviewImage(base64);
      }
    }

    e.target.value = '';
  }

  function handleUploadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (imageName) {
      setHasImageChoosed(false);
      setIsPhotoUploading(true);
      api.signPhoto(imageName).then((response) => {
        const signedUrl = response.data.signedUrl;
        const imageUrl = signedUrl.split('?')[0];

        if (avatarBlob) {
          api.uploadPhoto(signedUrl, avatarBlob).then(() => {
            setImageUrl(imageUrl)
            setIsPhotoUploading(false);
          });
        }
      })
    }
  }

  function handleCancelUpload() {
    setPreviewImage(null);
    setImageName(undefined);
    setHasImageChoosed(false);
  }

  function handleFormSubmit(values: ValuesProps) {
    setIsFormUploading(true);
    onSubmit(values, imageUrl);
  }
  
  return (
    <Container>
      <Form onSubmit={handleUploadSubmit}>
        <UserImage src={previewImage ? previewImage :  userImage} alt='user`s preview image'/>
        <FileInputLabel>{imageName ? imageName : 'Choose Photo'}
          <FileInput 
            type='file' 
            name="avatarFile" 
            id="uploadAvatar" 
            accept="image/png,image/jpeg,image/jpg" 
            onChange={(e) => handleImageChange(e)}
          />
        </FileInputLabel>
        {hasImageChoosed && 
          <Row>
            <UploadBtn type='submit'>Upload Photo</UploadBtn>
            <CancelUploadBtn type='button' onClick={handleCancelUpload}>Cancel</CancelUploadBtn>
          </Row>
        }
        {isPhotoUploading && <Row>Loading...</Row>}
      </Form>
      <FinalForm onSubmit={handleFormSubmit} initialValues={currentUser} render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <HalfWidthFieldWrapper>
              <Field name='first_name' type='text' render={({input}) => (
                <>
                  <TextInput {...input} type='text' id='firstName' placeholder='First Name*'/>
                  <Label htmlFor='firstName'>First Name*</Label>
                </>
              )}/>
            </HalfWidthFieldWrapper>
            <HalfWidthFieldWrapper>
              <Field name='last_name' render={({input}) => (
                <>
                  <TextInput {...input} type='text' id='lastName' placeholder='Last Name*'/>
                  <Label htmlFor='lastName'>Last Name*</Label>
                </>
              )}/>
            </HalfWidthFieldWrapper>
          </FormRow>
          <FullWidthFieldWrapper>
            <Field name='position' render={({input}) => (
              <SelectWrapper>
                <Select
                  value={positionOptions.find(option => option.value === input.value)}
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
            <Field name='position2' render={({input}) => (
              <SelectWrapper>
                <Select
                  value={positionOptions.find(option => option.value === input.value)}
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
                <TextInput {...input} type='string' id='age' placeholder='Age*'/>
                <Label htmlFor='age'>Age*</Label>
              </>
            )}/>
          </FullWidthFieldWrapper>
          <ZeroMarginRow>
            <HalfWidthFieldWrapper>
              <Field name='feet' render={({input}) => (
                  <>
                    <TextInput {...input} type='string' id='feet' placeholder='Feet*'/>
                    <Label htmlFor='feet'>Feet*</Label>
                  </>
                )}/>
            </HalfWidthFieldWrapper>
            <HalfWidthFieldWrapper>
              <Field name='inches' render={({input}) => (
                  <>
                    <TextInput {...input} type='string' id='inches' placeholder='Inches'/>
                    <Label htmlFor='inches'>Inches*</Label>
                  </>
                )}/>
            </HalfWidthFieldWrapper>
          </ZeroMarginRow>
          <Field name='weight' render={({input}) => (
            <FullWidthFieldWrapper>
              <TextInput {...input} type='string' id='weight' placeholder='Weight*'/>
              <Label htmlFor='weight'>Weight*</Label>
            </FullWidthFieldWrapper>
          )}/>
          <FormRow>
            <Field name='throws_hand' render={({input}) => (
              <HalfWidthFieldWrapper>
                <SelectWrapper>
                  <Select
                    value={handsOptions.find(option => option.value === input.value)}
                    options={handsOptions}
                    label='Throws*'
                    placeholder='Throws*'
                    styles={customSelectStyles}
                    onChange={(e) => input.onChange(e?.value)}
                  />
                </SelectWrapper>
              </HalfWidthFieldWrapper>
            )}/>
            <Field name='bats_hand' render={({input}) => (
              <HalfWidthFieldWrapper>
                <SelectWrapper>
                  <Select
                    value={handsOptions.find(option => option.value === input.value)}
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
                  value={schoolOptions.find(option => option.value === input.value.id)}
                  options={schoolOptions}
                  label='School'
                  placeholder='School'
                  styles={customSelectStyles}
                  onChange={(option) => input.onChange({id: option?.value, name: option?.label})} 
                />
              </SelectWrapper>
            )}/>
          </FullWidthFieldWrapper>
          <FullWidthFieldWrapper>
            <Field name='school_year' render={({input}) => (
              <SelectWrapper>
                <Select
                  value={schoolYearsOptions.find(option => option.value === input.value)}
                  options={schoolYearsOptions}
                  label='School Year'
                  placeholder='School Year'
                  styles={customSelectStyles}
                  onChange={(e) => input.onChange(e?.value)}
                />
              </SelectWrapper>
            )}/>
          </FullWidthFieldWrapper>
          <FullWidthFieldWrapper>
            <Field name='teams' render={({input}) => (
              <SelectWrapper>
                <Select
                  value={teamOptions.filter(option => input.value.find((item: {id: string; name: string}) => item.id === option.value))}
                  options={teamOptions}
                  label='Team'
                  placeholder='Team'
                  styles={customSelectStyles}
                  isMulti={true}
                  //@ts-ignore
                  onChange={(value) => input.onChange(value?.map(item => ({id: item.value, name: item.label})))}
                />
              </SelectWrapper>
            )}/>
          </FullWidthFieldWrapper>
          <CategoryHeader>Facility</CategoryHeader>
          <FullWidthFieldWrapper>
            <Field name='facilities' render={({input}) => (
              <SelectWrapper>
                <Select
                  value={facilitiesOptions.filter(option => input.value.find((item: {id: string; email: string; u_name: string}) => item.id === option.value.id))}
                  options={facilitiesOptions}
                  label='Facility'
                  placeholder='Facility'
                  // @ts-ignore
                  styles={customSelectStyles}
                  isMulti={true}
                  // @ts-ignore
                  onChange={(value) => input.onChange(value?.map(item => ({id: item.value.id, email: item.value.email, u_name: item.value.u_name})))}
                />
              </SelectWrapper>
            )}/>
          </FullWidthFieldWrapper>
          <CategoryHeader>About</CategoryHeader>
          <Field name='biography' render={({input}) => (
            <FullWidthFieldWrapper>
              <Textarea {...input} id='about' placeholder='Describe yourself in a few words' />
              <Label htmlFor='about'>Describe yourself in a few words</Label>
            </FullWidthFieldWrapper>
          )}/>
          <FormRow>
            <CancelBtn type='button' onClick={() => hideUserInfoForm()}>Cancel</CancelBtn>
            <SubmitBtn type='submit'>{isFormUploading ? <Loader type='TailSpin' color='#fff' height={35} width={35}/> : 'Save'}</SubmitBtn>
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
  margin-bottom: 23px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserImage = styled.img`
  margin-bottom: 8px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

const FileInputLabel = styled.label`
  margin-bottom: 10px;
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

const Row = styled.div`
  display: flex;
`

const UploadBtn = styled.button`
  margin-right: 20px;
  color: #48bbff;
  &:hover {
    text-decoration: underline;
  }
`

const CancelUploadBtn = styled(UploadBtn)`
  margin-right: 0;
  color: #788b99;
  &:hover {
    color: #23527c;
  }
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
  // &:focus, &:active {
  //   position: relative;
  //   z-index: 3;
  // } 
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: solid 1px transparent;
  background-color: #48bbff;
  &:hover {
    color: #fff;
  }
`