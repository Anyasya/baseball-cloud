import {
  createAsyncThunk,
  createReducer,
  combineReducers,
} from '@reduxjs/toolkit';
import * as api from 'api';
import {RootState} from 'store';

const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: SignInDto): Promise<SignInResDto> => {
    try {
      const response = await api.signIn(data);
      const {accessToken, user} = response.data;
      await StorageService.setAccessToken(accessToken);
      return {accessToken, user};
    } catch (err) {
      return handleAsyncError(err);
    }
  },
);

export const accessTokenReducer = createReducer(
  {
    accessToken: null as string | null,
    signingInStatus: 'idle' as LoadingStatus,
  },
  (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signingInStatus = 'pending';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const {accessToken} = action.payload;
        state.accessToken = accessToken;
        state.signingInStatus = 'fulfilled';
      })
      .addCase(signIn.rejected, (state) => {
        state.signingInStatus = 'rejected';
      });
  },
);

const guestUser = {} as User;

const userReducer = createReducer(
  {
    guestUser,
  },
  (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => ({
      ...state,
      ...action.payload.user,
    }));
  },
);

export const reducer = combineReducers({
  accessToken: accessTokenReducer,
  user: userReducer,
});

export const actions = {
  signIn,
};

export const selectors = {
  selectAccessToken: (state: RootState) => state.auth.accessToken.accessToken,
  selectSigningInStatus: (state: RootState) => {
    return state.auth.accessToken.signingInStatus;
  },
  selectUser: (state: RootState) => {
    return state.auth.user;
  },
};