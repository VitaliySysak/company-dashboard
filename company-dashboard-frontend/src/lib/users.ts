import { UserRole } from '@/@types/user';
import { Api } from '../services/api-client';

export const getUser = async (id: string, token: string) => {
  const user = await Api.users.getUserApi(id, token);

  return user;
};

export const getUsers = async (token: string) => {
  const users = await Api.users.getUsersApi(token);

  return users;
};

export const getAllUsers = async (token: string) => {
  const users = await Api.users.getUsersApi(token);

  return users;
};

export const deleteUser = async (id: string, token: string, role: UserRole) => {
  role === UserRole.SUPER_ADMIN ? await Api.users.deleteAdmin(id, token) : await Api.users.deleteUser(id, token);
};
