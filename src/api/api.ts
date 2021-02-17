import httpClient from './httpClient';
import * as queries from './queries';

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

export async function getSchools() {
  return httpClient.post('/graphql', queries.getSchoolsQuery());
}

export function getTeams() {
  return httpClient.post('/graphql', queries.getTeamsQuery());
}

export function getFacilities() {
  return httpClient.post('/graphql', queries.getFacilitiesQuery());
}