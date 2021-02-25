import {createAsyncThunk, createReducer, createAction} from '@reduxjs/toolkit';
import {RootState} from 'store';
import * as api from 'api/api';
import History from 'services/history';
import {AppRoutes} from 'navigation/routes';
// import {handleAsyncError} from 'store/utils';

const setAccessUserData = createAction<{accessToken: string, client: string, uid: string, user: {id: string; email: string, role: string}}>('auth/setAccessData');

const setProfileInfo = createAction<{avatar: string, firstName: string, lastName: string}>('auth/setProfileInfo');

const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: any) => {
    try {
      const response = await api.signIn(data.email, data.password);
      const {email, id, role} = response.data.data;
      const accessToken = response.headers['access-token'];
      const client = response.headers.client;
      const uid = response.headers.uid;
      localStorage.setItem('accessData', JSON.stringify({accessToken, client, uid}));
      localStorage.setItem('user', JSON.stringify({email, id, role}));
      History.push(AppRoutes.privateRoutes.profile);
      return {accessToken, client, uid, email, id};
    } catch (err) {
      throw err;
      // return handleAsyncError(err);
    }
  }
);

const signUp = createAsyncThunk(
  'auth/signUp',
  async (data: any) => {
    try {
      const response = await api.signUp(data.email, data.password, data.password_confirmation, data.role);
      const {email, id, role} = response.data.data;
      const accessToken = response.headers['access-token'];
      const client = response.headers.client;
      const uid = response.headers.uid;
      localStorage.setItem('accessData', JSON.stringify({accessToken, client, uid}));
      localStorage.setItem('user', JSON.stringify({email, id, role}));
      History.push(AppRoutes.privateRoutes.profile);
      return {accessToken, client, uid, email, id};
    } catch (err) {
      throw err;
    }
  },
);

const signOut = createAsyncThunk('auth/signOut', () => {
  localStorage.removeItem('accessData');
  localStorage.removeItem('user');
  History.push(AppRoutes.publicRoutes.signIn);
});

const initialState = {
  accessToken: null as string | null,
  client: null as string | null,
  uid: null as string | null,
  isSignUpLoading: false,
  isSignInLoading: false,
  isSignOutLoading: false,
  user: {
    role: null as string | null,
    id: null as string | null,
    email: null as string | null,
    avatar: null as string | null,
    firstName: null as string | null,
    lastName: null as string | null,
  },
  hasSignPassed: false,
}

export const reducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(setAccessUserData, (state, action) => {
      const {accessToken, client, uid, user} = action.payload;
      state.accessToken = accessToken;
      state.client = client;
      state.uid = uid;
      state.user.id = user.id;
      state.user.email = user.email;
      state.user.role = user.role;
    });

    builder.addCase(setProfileInfo, (state, action) => {
      const {avatar, firstName, lastName} = action.payload;
      state.user.avatar = avatar;
      state.user.firstName = firstName;
      state.user.lastName = lastName;
    });

    builder
      .addCase(signIn.pending, (state) => {
        state.isSignInLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const {accessToken, client, uid, email, id} = action.payload;
        state.accessToken = accessToken;
        state.uid = uid;
        state.client = client;
        state.user.id = id;
        state.user.email = email;
        state.isSignInLoading = false;
        state.hasSignPassed = true;
      })
      .addCase(signIn.rejected, (state) => {
        state.isSignInLoading = false;
      });
    
    builder
      .addCase(signOut.pending, (state) => {
        state.isSignOutLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.accessToken = null;
        state.client = null;
        state.uid = null;
        state.isSignOutLoading = false;
        state.hasSignPassed = false;
        state.user.id = null;
        state.user.email = null; 
      })
      .addCase(signOut.rejected, (state) => {
        state.isSignOutLoading = false;
      });
    
    builder
      .addCase(signUp.pending, (state) => {
        state.isSignUpLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const {accessToken, client, uid, email, id} = action.payload;
        state.accessToken = accessToken;
        state.uid = uid;
        state.client = client;
        state.user.id = id;
        state.user.email = email;
        state.isSignUpLoading = false;
      })
      .addCase(signUp.rejected, (state) => {
        state.isSignUpLoading = false;
      });
  },
);

export const actions = {
  signUp,
  signIn,
  signOut,
  setAccessUserData,
  setProfileInfo,
};

export const selectors = {
  selectAccessToken: (state: RootState) => state.auth.accessToken,
  selectIsSignInLoading: (state: RootState) => {
    return state.auth.isSignInLoading;
  },
  selectIsSignUpLoading: (state: RootState) => {
    return state.auth.isSignUpLoading;
  },
  selectIsSignOutloading: (state: RootState) => {
    return state.auth.isSignOutLoading;
  },
  selectClient: (state: RootState) => state.auth.client,
  selectUid: (state: RootState) => state.auth.uid,
  selectUser: (state: RootState) => state.auth.user,
};