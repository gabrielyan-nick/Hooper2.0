// import { EnumAuth, IAuthResponse, IEmailPassword } from './user.interface';
// import { userActions } from './user.slice';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { errorCatch } from 'api/api.helper';
// import AuthService from 'services/auth.service';

// export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
//   'auth/register',
//   async (data, thunkApi) => {
//     try {
//       const response = await AuthService.main(EnumAuth.Register, data);
//       return response;
//     } catch (e) {
//       return thunkApi.rejectWithValue(errorCatch(e));
//     }
//   },
// );

// export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
//   'auth/login',
//   async (data, thunkApi) => {
//     try {
//       const response = await AuthService.main(EnumAuth.Login, data);
//       return response;
//     } catch (e) {
//       return thunkApi.rejectWithValue(errorCatch(e));
//     }
//   },
// );

// export const checkAuth = createAsyncThunk<IAuthResponse>(
//   'auth/access-token',
//   async (_, thunkApi) => {
//     try {
//       const response = await AuthService.getNewTokens();
//       return response.data;
//     } catch (e) {
//       if (errorCatch(e) === 'jwt expired')
//         thunkApi.dispatch(userActions.logout());
//       return thunkApi.rejectWithValue(errorCatch(e));
//     }
//   },
// );
