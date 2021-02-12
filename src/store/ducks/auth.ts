import {createAsyncThunk, createReducer, createAction} from '@reduxjs/toolkit';
import {RootState} from 'store';
import * as api from 'api/api';
// import {handleAsyncError} from 'store/utils';

const setAccessToken = createAction<string>('auth/setAccessToken');

const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: any) => {
    try {
      const response = await api.signIn(data.email, data.password);
      const {email, id} = response.data.data;
      const accessToken = response.headers['access-token'];
      const client = response.headers.client;
      const uid = response.headers.uid;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);

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
      const {email, id} = response.data.data;
      const accessToken = response.headers['access-token'];
      const client = response.headers.client;
      const uid = response.headers.uid;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);

      return {accessToken, client, uid, email, id};
    } catch (err) {
      throw err;
    }
  },
);

const signOut = createAsyncThunk('auth/signOut', () => {
  return localStorage.removeItem('accessToken');
});

export const reducer = createReducer(
  {
    accessToken: null as string | null,
    client: null as string | null,
    uid: null as string | null,
    isSignUpLoading: false,
    isSignInLoading: false,
    isSignOutLoading: false,
    user: {
      id: null as string | null,
      email: null as string | null,
    },
    hasSignPassed: false,
  },
  (builder) => {
    builder.addCase(setAccessToken, (state, action) => {
      state.accessToken = action.payload;
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
        state.user = {id, email};
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
        state.isSignOutLoading = false;
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
        state.user = {id, email};
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
  setAccessToken,
};

export const selectors = {
  selectAccessToken: (state: RootState) => state.auth.accessToken,
  selectIsSignInLoading: (state: RootState) => {
    return state.auth.isSignInLoading;
  },
  selectSigningOutStatus: (state: RootState) => {
    return state.auth.isSignOutLoading;
  },
  selectClient: (state: RootState) => state.auth.client,
  selectUid: (state: RootState) => state.auth.uid,
  selectHasSignPassed: (state: RootState) => state.auth.hasSignPassed,
};