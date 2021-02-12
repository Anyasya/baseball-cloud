import httpClient from './httpClient';

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