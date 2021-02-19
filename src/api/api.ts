import axios from 'axios';
import httpClient from './httpClient';
import * as queries from './queries';
import {FormProps} from '../components/UserInformationForm';

export async function signIn(email: string, password: string) {
  const user = {
    email,
    password,
  };

  return httpClient.post('/auth/sign_in', user, {withToken: false});
}

export async function signUp(email: string, password: string, password_confirmation: string, role: string) {
  const user = {
    email,
    password,
    password_confirmation,
    role
  };

  return httpClient.post('/auth', user, {withToken: false});
}

export async function signPhoto(name: string) {
  return httpClient.post('s3/signed_url', {name});
}

export async function uploadPhoto(url: string, base64: string) {
  return axios.put(url, base64);
}

export function validateToken() {
  return httpClient.get('auth/validate_token');
}

export function getSchools() {
  return httpClient.post('/graphql', queries.getSchoolsQuery());
}

export function getTeams() {
  return httpClient.post('/graphql', queries.getTeamsQuery());
}

export function getFacilities() {
  return httpClient.post('/graphql', queries.getFacilitiesQuery());
}

export function updateProfile(form: FormProps) {
  return httpClient.post('/graphql', queries.updateProfileQuery(form));
}