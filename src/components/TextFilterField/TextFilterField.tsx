import React from 'react';
import styled from 'styled-components';
import {FieldRenderProps} from 'react-final-form';
import FilterToggle from 'assets/img/filterToggle.svg';

interface TextFilterFieldProps extends FieldRenderProps<string> {
  label: string;
}

function TextFilterField({input, label}: TextFilterFieldProps) {
  return (
    <Label>{label}
      {label === 'Age' ? (
        <NumberInput type='number' min='6' max='30' {...input} placeholder={label} />
      ) : (
        <TextInput type='text' {...input} placeholder={label} />
      )}
      <Toggle />
    </Label>
  );
}

export default TextFilterField;

const Label = styled.label`
  font-size: 0;
  position: relative;
`

const Toggle = styled.span`
  width: 16px;
  height: 9px;
  position: absolute;
  top: 16px;
  right: 0;
  background-image: url(${FilterToggle});
  cursor: pointer;
`

const TextInput = styled.input`
  margin-left: 15px;
  width: 66px;
  padding: 5px 5px 7px 0;
  font-size: 16px;
  line-height: 19px;
  min-height: 38px;
  font-weight: 400;
  color: #788b99;
  transition: width .5s;
  &::placeholder {
    color: #48BBFF;
  }
  &:active, &:focus {
    width: 180px;
    border-bottom: 1px solid #48bbff;
    &::placeholder {
      color: #788b99;
    }
    &:focus + span {
      transform: rotate(180deg);
    }
  }
`

const NumberInput = styled(TextInput)`
  width: 47px;
  &:active, &:focus {
    width: 80px;
  }
  &::-webkit-inner-spin-button {
    display: none;  
  }
`