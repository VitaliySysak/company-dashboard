import { Company, CompanyFormValues, GetCompaniesDto, CompanyResponse } from './../../@types/company';
import { axiosInstance } from './axios-instance';

export const getCompany = async (id: string, token: string) => {
  const company = (
    await axiosInstance.get<Company>('/company/' + id, { headers: { Authorization: `Bearer ${token}` } })
  ).data;

  return company;
};

export const getCompanies = async (token: string, filters?: GetCompaniesDto) => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value.toString());
      }
    });
  }
  const companies = (
    await axiosInstance.get<CompanyResponse>(`/company/?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;

  return companies;
};

export const addCompany = async (newCompany: CompanyFormValues, token: string) => {
  const company = await axiosInstance.post<Company>('/company', newCompany, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return company;
};

export const deleteCompany = async (id: string, token: string) => {
  const { data } = await axiosInstance.delete<Company>('/company/' + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const deleteAdminCompany = async (id: string, token: string) => {
  const { data } = await axiosInstance.delete<Company>('/company/admin/' + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
