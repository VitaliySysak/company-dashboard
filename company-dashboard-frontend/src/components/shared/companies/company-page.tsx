import React from 'react';
import { cn } from '@/src/lib/utils';
import { Link, useParams } from 'react-router-dom';
import { useRefresh } from '@/src/hooks/useRefresh';
import { useQuery } from '@tanstack/react-query';
import { Company } from '@/@types/company';
import { deleteUserCompany, getUserCompany } from '@/src/lib/companies';
import { Container } from '../../ui/container';
import { Title } from '../../ui/title';
import { Button } from '../../ui/button';
import { UserRole } from '@/@types/user';
import toast from 'react-hot-toast';
import axios from 'axios';

interface Props {
  className?: string;
}

export const CompanyPage: React.FC<Props> = ({ className }) => {
  const { id } = useParams<{ id: string }>();
  const { accessToken, role } = useRefresh();

  const {
    data: company,
    isLoading,
    isError,
  } = useQuery<Company>({
    queryKey: ['company', id],
    queryFn: () => getUserCompany(id!, accessToken!),
    enabled: !!accessToken && !!id,
  });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error loading company</h3>;
  if (!company) return <h3>No company</h3>;

  const onDelete = async () => {
    try {
      await deleteUserCompany(String(id), accessToken!, role as UserRole);
      toast.success('User deleted successfully', { icon: '✅' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message === 'You do not have right permission') {
          toast.error('You do not have right permission', { icon: '❌' });
        }
      } else {
        toast.error('Server Error, try again', { icon: '❌' });
      }
    }
  };

  return (
    <section className={cn('', className)}>
      <Container>
        <div className="flex">
          <img className="flex-1" src={company.logoUrl ? company.logoUrl : '/images/logo.png'} alt={company.name} />
          <div className="flex-1">
            <Title text={company.name} className="font-extrabold mb-6 text-[36px]" />
            <p>Service: {company.service}</p>
            <h2>Capital: ${company.capital}</h2>
            <p>Details: {company.details}</p>
            <p>Created At: {company.createdAt}</p>
            <iframe
              className="w-[400px] h-[200px]"
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${
                company.lat
              },${company.lng}`}
            ></iframe>
            <Link to="/">
              <Button onClick={onDelete} className="mt-8" variant={'destructive'}>
                Delete company
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
