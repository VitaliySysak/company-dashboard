import { GetCompaniesDto } from './../../@types/company';
import { CompanyFormValues } from '@/@types/company';
import { Api } from '../services/api-client';
import { UserRole } from '@/@types/user';

export const getUserCompany = async (id: string, token: string) => {
  const userCompany = await Api.companies.getCompany(id, token!);

  return userCompany;
};

export const getUserCompanies = async (token: string, filters?: GetCompaniesDto) => {
  const userCompanies = await Api.companies.getCompanies(token!, filters);

  return userCompanies;
};

export const addUserCompany = async (newCompany: CompanyFormValues, token: string) => {
  const company = await Api.companies.addCompany(newCompany, token);

  return company;
};

export const deleteUserCompany = async (id: string, token: string, role: UserRole) => {
  role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN
    ? await Api.companies.deleteAdminCompany(id, token)
    : await Api.companies.deleteCompany(id, token);
};
