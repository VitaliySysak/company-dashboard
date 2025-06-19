import { User } from '@/@types/user';
import { axiosInstance } from './axios-instance';

export const getUserApi = async (id: string, token: string) => {
  const user = (
    await axiosInstance.get<User>('/users/super-admin/one/' + id, { headers: { Authorization: `Bearer ${token}` } })
  ).data;

  return user;
};

export const getUsersApi = async (token: string) => {
  const users = (
    await axiosInstance.get<User[]>('/users/super-admin/all', { headers: { Authorization: `Bearer ${token}` } })
  ).data;

  return users;
};

export const getAllUsersApi = async (token: string) => {
  const users = (
    await axiosInstance.get<User[]>('/users/super-admin/all', { headers: { Authorization: `Bearer ${token}` } })
  ).data;

  return users;
};

export const deleteUser = async (id: string, token: string) => {
  const { data } = await axiosInstance.delete<User>('/users/admin/' + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const deleteAdmin = async (id: string, token: string) => {
  const { data } = await axiosInstance.delete<User>('/users/super-admin/' + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
