import { Styles } from 'react-select';

export const customSelectStyles: Partial<Styles<{value: string, label: string}, false>> = {
  container: (base) => ({...base, fontSize: 16, width: 110}),
  indicatorSeparator: () => ({display: 'none'}),
  control: (base, {isFocused}) => { 
    const style = isFocused ? 
      {color: '#788b99', outline: 'none'}
      : 
      {color: '#48BBFF'};

    return {
      ...base,
      minHeight: 40,
      ...style,
      borderRadius: 4,
      fontSize: 16,
      backgroundColor: '#fff',
      border: 'none',
      boxShadow: 'none',
      justifyContent: 'flex-start',
      '&:hover': {outline: 'none'},
    };
  },
  valueContainer: (base) => ({...base, flex: 'none'}),
  placeholder: (base, {isFocused}) => ({...base, color: isFocused ? '#788b99' : '#48BBFF'}),
  clearIndicator: () => ({display: 'none'}),
  option: (base) => ({...base, color: '#788b99'}),
  singleValue: (base, {selectProps: { label }}) => {
    const before = label === 'Count' ? {'&::before': {content: "'Show: '"}} : null;
    
    return {
      ...base, 
      color: '#48BBFF',
      position: 'static',
      overflow: 'visible',
      top: 'auto',
      transform: 'none',
      ...before,
    }},
    indicatorsContainer: (base, { selectProps: { isOpen } }) => ({
      ...base,
      transform: `scale(${isOpen ? -1 : 1})`,
      transition: '0.2s ease-out',
    }),
};