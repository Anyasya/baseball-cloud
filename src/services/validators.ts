import MailChecker from 'mailchecker';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { Location } from 'interfaces/location';
import { AvailabilitySessionType } from '__generated__/types';

const expDateRegexp = /^(0[1-9]|1[0-2])\/([0-9]{2})/;
const monthAndYearRegexp = /^(0[1-9]|1[0-2])\/(20\d{2}|19\d{2})/;
const REGISTRATION_NUMBER_LENGTH = 16;

export const validationRules = {
  required: (value: any) => {
    const currentValue = typeof value === 'string' ? value.trim() : value;
    return currentValue ? undefined : ['Required field'];
  },
  requiredArr: (value: any[]) =>
    value?.length > 0 ? undefined : ['Required field'],
  email: (value: string) => {
    const currentValue = value?.trim();
    if (!currentValue) return ['Please enter your email.'];
    if (!MailChecker.isValid(currentValue)) return ['Email invalid'];
  },
  possiblePhone: (value: string) =>
    value && isPossiblePhoneNumber(value)
      ? undefined
      : ['Incorrect phone number'],
  expDate: (value = '') =>
    expDateRegexp.test(value) ? undefined : ['Incorrect exp date'],
  monthAndYear: (value = '') =>
    monthAndYearRegexp.test(value) ? undefined : ['Incorrect date format'],
  registrationNumber: (value = '') =>
    value.replaceAll(' ', '').length === REGISTRATION_NUMBER_LENGTH
      ? undefined
      : ['Incorrect registration number'],
  minLength: (value: string, minLength: number) =>
    value.length < minLength
      ? [`Must have at least ${minLength} characters`]
      : undefined,
  passStrength: (value: string) =>
    value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
      ? undefined
      : 'Password must be 8 characters long and must contain lowercase and uppercase letters and number',
  editableCheckboxRequired: (value: { isCompleted: boolean; text: string }) =>
    value.text ? undefined : ['Required field'],
  address: (value: Location) =>
    value?.fullAddress ? undefined : { error: 'Required field' },
};

export const composeValidators = (...validators: any) => (
  value: any,
  allValues: any,
  fieldState: any,
) =>
  validators.reduce(
    (error: any, validator?: any) =>
      error || validator?.(value, allValues, fieldState),
    undefined,
  );

export function locationIdRequiredValidator(
  value: string,
  { sessionType }: any,
) {
  const hasInPersonType = sessionType === AvailabilitySessionType.InPerson;

  if (!value && hasInPersonType) {
    return 'If the session type "In person" - the field is required';
  }
}
