import React, {useState} from 'react';
import styled from 'styled-components';
import {FieldRenderProps} from 'react-final-form';
import Select from 'react-select';
import {customSelectStyles} from './selectStyles';
import FilterToggle from 'components/Icons/FilterToggle';

interface SelectFilterFieldProps extends FieldRenderProps<string> {
  label: string;
  options: {label: string; value: string}[];
  onChange?: (value: string | undefined) => void;
}

function SelectFilterField({input, label, options, onChange}: SelectFilterFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Label>{label}
      <Select
        // defaultValue={label === 'Count' || label === 'Favorite' ? options[0] : null}
        defaultValue={options[0]}
        options={options}
        label={label}
        placeholder={label}
        styles={customSelectStyles}
        isSearchable = {false}
        components={{
          DropdownIndicator: FilterToggle
        }}
        onChange={(e) => {
          if (onChange) {
            onChange(e?.value);
          }
          
          input.onChange(e?.value);
        }}
        onMenuOpen={() => {
          setIsOpen(true);
        }}
        onMenuClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />
    </Label>
  );
}

export default SelectFilterField;

const Label = styled.label`
  font-size: 0;
`
