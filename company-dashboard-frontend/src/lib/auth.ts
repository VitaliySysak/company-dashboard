import { LoginUser, ReginsterUser, User } from '@/@types/user';
import { axiosInstance } from '../services/axios-instance';
import { Api } from '../services/api-client';

export const registerUser = async (data: ReginsterUser) => {
  const { accessToken, role } = await Api.auth.register(data);

  return { accessToken, role };
};

export const loginUser = async (data: LoginUser) => {
  const { accessToken, role } = await Api.auth.login(data);

  return { accessToken, role };
};

export const logOut = async () => {
  const isSuccess = await Api.auth.logOut();

  return isSuccess;
};

export const resetUserPassword = async (data: LoginUser) => {
  const { id } = await Api.auth.resetPassword(data);

  return { id };
};

export const refreshToken = async () => {
  const { accessToken, role } = await Api.auth.refresh();

  return { accessToken, role };
};
