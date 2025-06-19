import { LoginUser, ReginsterUser } from '@/@types/user';
import { axiosInstance } from './axios-instance';

export const register = async (data: ReginsterUser) => {
  const { accessToken, role } = (
    await axiosInstance.post<{ accessToken: string; role: string }>('/auth/register', {
      ...data,
      email: data.email.toLowerCase(),
    })
  ).data;

  return { accessToken, role };
};

export const login = async (data: LoginUser) => {
  const { accessToken, role } = (
    await axiosInstance.post<{ accessToken: string; role: string }>('/auth/login', {
      ...data,
      email: data.email.toLowerCase(),
    })
  ).data;

  return { accessToken, role };
};

export const resetPassword = async (data: LoginUser) => {
  const { id } = (
    await axiosInstance.post<{ id: string }>('/auth/reset-password', {
      ...data,
      email: data.email.toLowerCase(),
    })
  ).data;

  return { id };
};

export const refresh = async () => {
  const { accessToken, role } = (
    await axiosInstance.post<{ accessToken: string; role: string }>('/auth/refresh', {}, { withCredentials: true })
  ).data;

  return { accessToken, role };
};

export const logOut = async () => {
  const isSuccess = await axiosInstance.post('/auth/logout', {}, { withCredentials: true });

  return isSuccess;
};
