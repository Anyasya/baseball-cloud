import { Styles } from 'react-select';

export const customSelectStyles: Partial<Styles<{value: string, label: string}, false>> = {
  indicatorSeparator: () => ({display: 'none'}),
  control: (base, {isFocused, selectProps: { label }}) => { 
    const style = isFocused ? 
      {borderWidth: 1, borderColor: '#48bbff', backgroundColor: '#fff', boxShadow: 'none', '&:hover': {outline: 'none'}}
      : 
      {borderWidth: 1, borderColor: '#eff1f3', backgroundColor: '#eff1f3', '&:hover': {outline: 'none'}};

    return {
      ...base,
      '&::before': {
        content: `"${label}"`,
        width: 'fit-content',
        height: 15,
        fontSize: isFocused ? 10 : 14,
        position: 'absolute',
        transform: isFocused ? 'translate(-4px, -10px)' : 'translate(0, 0)',
        top: 10,
        left: 10,
        color: '#788b99',
        transition: 'all 0.2s',
        visibility: isFocused ? 'visible' : 'hidden',
      },
      minHeight: 40,
      ...style,
      borderRadius: 4,
      fontSize: 14,
      color: '#788b99',
    };
  },
  placeholder: (base, {isFocused}) => ({...base, fontSize: 14, color: '#788b99', display: isFocused ? 'none' : 'block'}),
  multiValue: (base) => ({...base, color: '#007eff', border: '1px solid rgba(0,126,255,.24)', backgroundColor: 'rgba(0,126,255,.08)'}),
  multiValueLabel: (base) => ({...base, padding: '2px 5px',  color: '#007eff', fontSize: 14, order: 2}),
  multiValueRemove: (base) => ({...base, borderRight: '1px solid rgba(0,126,255,.24)', order: 1, cursor: 'pointer', '&:hover': {color: '#007eff', backgroundColor: 'rgba(0,126,255,.08)'}}),
  clearIndicator: () => ({display: 'none'}),
};