import React from 'react';
import styled from 'styled-components';
import {FieldRenderProps} from 'react-final-form';
import SearchIcon from 'components/Icons/SearchIcon';

interface SearchFilterFieldProps extends FieldRenderProps<string> {
  label: string;
}

function SearchFilterField({input, label}: SearchFilterFieldProps) {
  return (
    <SearchInputWrapper>
      <SearchIconWrapper>
        <SearchIcon/>
      </SearchIconWrapper>
      <SearchInput type='text' {...input} placeholder='Player Name'/>
    </SearchInputWrapper>
  );
}

export default SearchFilterField;

const SearchInputWrapper = styled.div`
  position: relative;
`

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
`

const SearchInput = styled.input`
  padding: 5px 5px 5px 24px;
  width: 130px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  color: #788b99;
  border-bottom: 1px solid #48bbff;
  &:: placeholder {
    opacity: 0.6;
  }
` 